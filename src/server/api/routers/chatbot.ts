/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prisma } from "@prisma/client";
import axios from "axios";
import { z } from "zod";
import { env } from "~/env.cjs";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "~/server/api/trpc";
import {
  Configuration,
  OpenAIApi,
  type CreateChatCompletionRequest
} from "openai";
import { cosine } from "ml-distance/lib/similarities";
import { TRPCError } from "@trpc/server";
import { IncomingMessage } from "http";

const configuration = new Configuration({
  apiKey: env.OPENAPI_KEY
});
const openai = new OpenAIApi(configuration);

export const chatbotRouter = createTRPCRouter({
  addArticles: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const embeddingParameters = {
        model: "text-embedding-ada-002",
        input: input.text
      };
      const sourceEmbedding = await openai.createEmbedding(embeddingParameters);

      const create = await ctx.prisma.articles.create({
        data: {
          text: input.text,

          embeddings: sourceEmbedding.data.data[0]?.embedding
        }
      });

      return {
        message: "Successfully created new article"
      };
    }),

  sendQuestion: publicProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ ctx, input }) => {
      const embeddingParameters = {
        model: "text-embedding-ada-002",
        input: input.question
      };

      const embedding = await openai.createEmbedding(embeddingParameters);

      const questionEmbedding = embedding.data.data[0]?.embedding;

      // Fetch all stored embeddings
      const sourceEmbeddings = await ctx.prisma.articles.findMany({
        select: {
          id: true,
          embeddings: true
        }
      });

      interface similarityList {
        id: string;
        similarity: number;
      }

      const similarities: similarityList[] = [];
      sourceEmbeddings.forEach((embedding) => {
        const similarity = 1 - cosine(embedding.embeddings, questionEmbedding);
        const similarityItems = {
          id: embedding.id,
          similarity: similarity
        };
        similarities.push(similarityItems);
      });

      similarities.sort((item1, item2) => item1.similarity - item2.similarity);

      const correctArticle = similarities[0];

      if (!correctArticle) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to find articles"
        });
      }
      let completionParameters: CreateChatCompletionRequest;

      if (correctArticle.similarity < 0.2) {
        const article = await ctx.prisma.articles.findFirst({
          where: {
            id: correctArticle.id
          },
          select: {
            text: true
          }
        });

        if (!article) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable to find article text"
          });
        }

        completionParameters = {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that only understand this context, which is ${article.text}.`
            },
            {
              role: "user",
              content: `${input.question}`
            }
          ],
          temperature: 0.5,
          max_tokens: 500,
          stream: true
        };
      } else {
        completionParameters = {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You can only answer "I'm sorry, I don't know the answer to your questions"`
            }
          ],
          temperature: 0
        };
      }

      const response = await openai.createChatCompletion(completionParameters, {
        responseType: "stream"
      });

      const stream = response.data as unknown as IncomingMessage;
      stream.on("data", (chunk: Buffer) => {
        const payloads = chunk.toString().split("\n\n");
        for (const payload of payloads) {
          if (payload.includes("[DONE]")) return;
          if (payload.startsWith("data:")) {
            const data: any = JSON.parse(payload.replace("data: ", ""));
            try {
              const chunk: undefined | string = data.choices[0].delta?.content;
              if (chunk) {
                console.log(chunk);
              }
            } catch (error: any) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              console.log(`Error with JSON.parse and ${payload}.\n${error}`);
            }
          }
        }
      });

      stream.on("end", () => {
        console.log("stream done");
      });

      stream.on("error", (err: Error) => {
        console.log(err);
      });
      // return {
      //   output: response.data
      // };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  })
});

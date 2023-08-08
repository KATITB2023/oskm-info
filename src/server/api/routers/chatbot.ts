/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// const configuration = new Configuration({
//   apiKey: env.OPENAPI_KEY
// });
// const openai = new OpenAIApi(configuration);

export const chatbotRouter = createTRPCRouter({
  addArticles: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.articles.create({
        data: {
          text: input.text
        }
      });
      const textSplitter = new RecursiveCharacterTextSplitter();

      const [articlesText] = await Promise.all([
        ctx.prisma.articles.findMany({
          select: {
            text: true
          }
        })
      ]);

      const docs = await textSplitter.createDocuments(
        articlesText.map((article) => {
          return article.text;
        })
      );

      const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({ modelName: "text-embedding-ada-002" })
      );

      const directory = "src/server/chatbot";
      await vectorStore.save(directory);

      return {
        message: "Articles successfully added"
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  })
});

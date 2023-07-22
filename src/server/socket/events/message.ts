/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createEvent } from "../helper";
import { currentlyTyping } from "../state";
import { getUserSockets } from "../room";
import {
  Configuration,
  OpenAIApi,
  type CreateChatCompletionRequest,
  CreateCompletionRequest
} from "openai";
import { cosine } from "ml-distance/lib/similarities";
import { type IncomingMessage } from "http";
import { env } from "~/env.cjs";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const messageEvent = createEvent(
  {
    name: "message",
    input: z.object({
      questionId: z.string(),
      message: z.string().min(1),
      chatHistory: z.string()
    }),
    authRequired: true
  },
  // async ({ ctx, input }) => {
  //   // const message = await ctx.prisma.message.create({
  //   //   data: {
  //   //     senderId: ctx.client.data.session.user.id,
  //   //     receiverId: input.receiverId,
  //   //     message: input.message
  //   //   }
  //   // });
  //   ctx.client.emit("question", {
  //     questionId: input.questionId,
  //     message: input.message
  //   });

  //   const embeddingParameters = {
  //     model: "text-embedding-ada-002",
  //     input: input.message
  //   };

  //   const embedding = await openai.createEmbedding(embeddingParameters);

  //   const questionEmbedding = embedding.data.data[0]?.embedding;

  //   // Fetch all stored embeddings
  //   const sourceEmbeddings = await ctx.prisma.articles.findMany({
  //     select: {
  //       id: true,
  //       embeddings: true
  //     }
  //   });

  //   interface similarityList {
  //     id: string;
  //     similarity: number;
  //   }

  //   const similarities: similarityList[] = [];
  //   sourceEmbeddings.forEach((embedding) => {
  //     const similarity = cosine(embedding.embeddings, questionEmbedding);
  //     const similarityItems = {
  //       id: embedding.id,
  //       similarity: similarity
  //     };
  //     similarities.push(similarityItems);
  //   });

  //   similarities.sort((item1, item2) => item2.similarity - item1.similarity);

  //   const correctArticle = similarities[0];

  //   if (!correctArticle) {
  //     throw new Error("Unable to find article");
  //   }
  //   let completionParameters: CreateChatCompletionRequest;

  //   let articlesFound = false;
  //   if (similarities.length > 1) {
  //     if (
  //       similarities[1] &&
  //       correctArticle.similarity - similarities[1].similarity > 0.05
  //     ) {
  //       articlesFound = true;
  //     }
  //   } else {
  //     if (correctArticle.similarity < 0.2) {
  //       articlesFound = true;
  //     }
  //   }

  //   if (articlesFound) {
  //     console.log("article id", correctArticle.id);
  //     const article = await ctx.prisma.articles.findFirst({
  //       where: {
  //         id: correctArticle.id
  //       },
  //       select: {
  //         text: true
  //       }
  //     });

  //     if (!article) {
  //       throw new Error("Unable to find article text");
  //     }

  //     completionParameters = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "system",
  //           content: `You are a helpful assistant that only understand this context, which is ${article.text}.`
  //         },
  //         {
  //           role: "user",
  //           content: `${input.message}`
  //         }
  //       ],
  //       temperature: 0.5,
  //       max_tokens: 500,
  //       stream: true
  //     };

  //     const response = await openai.createCompletion(completionParameters, {
  //       responseType: "stream"
  //     });

  //     // let accumulatedData = "";
  //     // const stream = response.data as unknown as IncomingMessage;
  //     // stream.on("data", (chunk: Buffer) => {
  //     //   // console.log(chunk.toString())
  //     //   const dataChunk = chunk.toString();
  //     //   accumulatedData += dataChunk;

  //     //   let payloadEndIndex = accumulatedData.indexOf("\n\n");
  //     //   while (payloadEndIndex !== -1) {
  //     //     const payload = accumulatedData.slice(0, payloadEndIndex);
  //     //     accumulatedData = accumulatedData.slice(payloadEndIndex + 2);

  //     //     if (payload.includes("[DONE]")) return;
  //     //     if (payload.startsWith("data:")) {
  //     //       const jsonData = payload.replace("data: ", "");
  //     //       if (jsonData.endsWith("}")) {
  //     //         const data: any = JSON.parse(jsonData);
  //     //         try {
  //     //           const chunk: undefined | string = data.choices[0].text;
  //     //           if (chunk) {
  //     //             console.log(chunk);
  //     //             ctx.io.emit("question", {
  //     //               questionId: input.questionId,
  //     //               message: chunk
  //     //             });
  //     //           }
  //     //         } catch (error: any) {
  //     //           // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //     //           console.log(`Error with JSON.parse and ${payload}.\n${error}`);
  //     //         }
  //     //       }
  //     //       payloadEndIndex = accumulatedData.indexOf("\n\n");
  //     //     }
  //     //   }
  //     // });

  //     const stream = response.data as unknown as IncomingMessage;
  //     stream.on("data", (chunk: Buffer) => {
  //       const payloads = chunk.toString().split("\n\n");
  //       for (const payload of payloads) {
  //         if (payload.includes("[DONE]")) return;
  //         if (payload.startsWith("data:")) {
  //           const data: any = JSON.parse(payload.replace("data: ", ""));
  //           try {
  //             const chunk: undefined | string = data.choices[0].delta?.content;
  //             if (chunk) {
  //               console.log(chunk);
  //               ctx.io.emit("question", {
  //                 questionId: input.questionId,
  //                 message: chunk
  //               });
  //             }
  //           } catch (error: any) {
  //             // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //             console.log(`Error with JSON.parse and ${payload}.\n${error}`);
  //           }
  //         }
  //       }
  //     });
  //   } else {
  //     ctx.io.emit("question", {
  //       questionId: input.questionId,
  //       message: "I'm sorry, I don't know the answer to your question"
  //     });
  //   }
  // }

  ({ ctx, input }) => {
    console.log("CHAT HISTORY", input.chatHistory);
    ctx.client.emit("question", {
      questionId: input.questionId,
      message: input.message,
      chatHistory: input.chatHistory
    });

    ctx.io.emit("question", {
      questionId: input.questionId,
      message: "Hai",
      chatHistory: input.chatHistory
    });

    return {
      questionId: input.questionId,
      message: "Hai",
      chatHistory: input.chatHistory
    };

    // const model = new ChatOpenAI({
    //   temperature: 0.5,
    //   modelName: "gpt-3.5-turbo",
    //   streaming: true,
    //   callbacks: [
    //     {
    //       handleLLMNewToken(token) {
    //         ctx.io.emit("question", {
    //           questionId: input.questionId,
    //           message: token
    //         });
    //       }
    //     }
    //   ]
    // });

    // const directory = "src/server/chatbot/vector";

    // const vectorStore = await HNSWLib.load(
    //   directory,
    //   new OpenAIEmbeddings({ modelName: "text-embedding-ada-002" })
    // );

    // const chain = ConversationalRetrievalQAChain.fromLLM(
    //   model,
    //   vectorStore.asRetriever(),
    //   {
    //     verbose: true
    //   }
    // );

    // await chain.call({
    //   question: input.message,
    //   chat_history: ""
    // });
    // console.log(res, "ini res");
  }
);

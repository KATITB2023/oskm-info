/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { env } from "~/env.cjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const chatbotRouter = createTRPCRouter({
  addArticles: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100
      });

      const docs = await textSplitter.createDocuments([input.text]);

      const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({ modelName: "text-embedding-ada-002" })
      );

      const directory = env.VECTOR_INDEX_PATH;
      await vectorStore.save(directory);

      return {
        message: "Vector index successfully updated"
      };
    })
});

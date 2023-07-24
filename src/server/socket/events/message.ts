/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createEvent } from "../helper";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

enum QuestionRole {
  USER = "User",
  CHATBOT = "OSKM GPT"
}

export const messageEvent = createEvent(
  {
    name: "message",
    input: z.object({
      questionId: z.string(),
      role: z.nativeEnum(QuestionRole),
      message: z.string().min(1),
      chatHistory: z.string()
    }),
    authRequired: true
  },
  async ({ ctx, input }) => {
    const model = new ChatOpenAI({
      temperature: 0.5,
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            ctx.io.emit("question", {
              questionId: input.questionId,
              role: QuestionRole.CHATBOT,
              message: token,
              chatHistory: input.chatHistory
            });
          }
        }
      ]
    });

    const directory = "src/server/chatbot";

    const vectorStore = await HNSWLib.load(
      directory,
      new OpenAIEmbeddings({ modelName: "text-embedding-ada-002" })
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(3),
      {
        verbose: true
      }
    );

    await chain.call({
      question: input.message,
      chat_history: input.chatHistory
    });
  }
);

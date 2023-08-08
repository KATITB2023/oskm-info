/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createEvent } from "../helper";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain, LLMChain } from "langchain/chains";
import {
  PromptTemplate,
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate
} from "langchain/prompts";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  addUserTries,
  getUserTries,
  setUserTries
} from "~/server/socket/redis";

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
    // Validate user tries
    const id = ctx.client.data.session.user.id;
    console.log("UserID", id);
    const tries = await getUserTries(id);
    let canAsk = true;
    if (tries !== null) {
      if (parseInt(tries, 10) >= 5) {
        canAsk = false;
      } else {
        void addUserTries(id);
      }
    } else {
      await setUserTries(id);
    }

    if (canAsk) {
      // INI RUN 2 KALI KARENA CONVQA CHAIN, COBA UBAH KE LLM CHAIN NORMAL (CARI CARA BUAT PASS HISTORYNYA)
      console.log("RUNNING ENTIRE CAN ASK SECTION");
      const model = new ChatOpenAI({
        temperature: 0.3,
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

      const context = await vectorStore.similaritySearch(input.message, 2);

      let contextText = "";
      context.forEach(
        (item) => (contextText = contextText.concat(item.pageContent))
      );

      const prompt_template = `You are an article list assistant that are given a context, a following conversation, and a follow up input.
      {context}
      Chat History:
      {chat_history}
      Follow Up Input: {question}
      AI:`;

      const custom_prompt = new PromptTemplate({
        inputVariables: ["context", "chat_history", "question"],
        template: prompt_template
      });

      // const custom_prompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(
      //     "You are an article list assistant that are given a context, a following conversation, and a follow up input.\n{context}"
      //   ),
      //   new MessagesPlaceholder("chat_history"),
      //   HumanMessagePromptTemplate.fromTemplate("{question}")
      // ]);

      // const chain = ConversationalRetrievalQAChain.fromLLM(
      //   model,
      //   vectorStore.asRetriever(3),
      //   {
      //     verbose: true,
      //   }
      // );

      const chain = new LLMChain({
        llm: model,
        prompt: custom_prompt,
        memory: ctx.client.data.memory,
        verbose: true
      });

      await chain.call({
        context: contextText,
        question: input.message
      });
    } else {
      console.log("Limit reached");
      throw new Error();
    }
  }
);

import { ChatOpenAI } from "langchain/chat_models/openai";

const instantiateChatBot = () => {
  const model = new ChatOpenAI({
    temperature: 0.5,
    modelName: "gpt-3.5-turbo",
    streaming: true
  });

  return model;
};

const globalForChatbot = globalThis as unknown as {
  chatbot?: ChatOpenAI;
};

export const chatbot = globalForChatbot.chatbot ?? instantiateChatBot();

if (process.env.NODE_ENV !== "production") globalForChatbot.chatbot = chatbot;

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button, Flex, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import AddMessageForm from "~/components/AddMessageForm";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
}

interface QuestionData {
  questionId: string;
  message: string;
  chatHistory: string;
}

const Chat: NextPage = () => {
  const { data: session } = useSession({ required: true });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionAdded, setQuestionAdded] = useState(false);
  const [messageAdded, setMessageAdded] = useState<QuestionData>();

  // HTML element that is scrolled to when new messages are added
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) return;

    scrollTargetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [scrollTargetRef]);

  useEffect(() => {
    scrollToBottomOfList();
  }, [scrollToBottomOfList]);

  useEffect(() => {
    if (messageAdded) {
      // Find the gpt message in the array
      const gptMessage = messages.find(
        (item) => item.id === messageAdded.questionId
      );
      // If found, continously append that message
      if (gptMessage) {
        gptMessage.message = gptMessage.message.concat(messageAdded.message);
      } else {
        if (!questionAdded) {
          setQuestionAdded(true);
          setMessages([
            ...messages,
            {
              id: uuidv4(),
              sender: "Me",
              message: messageAdded.message
            }
          ]);
        } else {
          setMessages([
            ...messages,
            {
              id: messageAdded.questionId,
              sender: "OSKM GPT",
              message: messageAdded.message
            }
          ]);
          setQuestionAdded(false);
        }
      }
    }
  }, [messageAdded]);

  useSubscription("question", (data) => {
    // console.log(data, "receiving data from socket");
    setMessageAdded(data);
  });

  return (
    <Layout title='Chat'>
      <Flex h={"92vh"} direction={"column"}>
        <Flex h={"full"} w={"full"} direction={"column"} bg={"gray"} p={"1rem"}>
          <Flex overflowY={"auto"} direction={"column"} h={"full"}>
            <Flex
              rowGap={"28px"}
              direction={"column"}
              h={"full"}
              paddingY={"1rem"}
            >
              {messages?.map((item) => (
                <Flex
                  as={"article"}
                  key={item.id}
                  direction={"column"}
                  rowGap={"0.25rem"}
                  bgColor={
                    item.sender === "Me"
                      ? "rgba(255, 255, 255, 0.50)"
                      : "rgba(17, 117, 132, 0.50)"
                  }
                  color={item.sender === "Me" ? "black" : "white"}
                  padding={"10px"}
                  borderRadius={
                    item.sender === "Me"
                      ? "10px 10px 0px 10px"
                      : "10px 10px 10px 0px"
                  }
                  width={"75%"}
                  placeSelf={item.sender === "Me" ? "end" : "start"}
                  alignItems={item.sender === "Me" ? "end" : "start"}
                >
                  <Flex as={"header"} columnGap={"2px"}>
                    <h3>{item.sender}</h3>
                  </Flex>
                  <Text as={"p"} whiteSpace={"pre-line"} lineHeight={"1.25"}>
                    {item.message}
                  </Text>
                </Flex>
              ))}
              <Flex ref={scrollTargetRef}></Flex>
            </Flex>
          </Flex>
          <Flex w={"full"} direction={"column"}>
            <AddMessageForm
              onMessagePost={() => scrollToBottomOfList()}
              chatHistory={messages}
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Chat;

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { v4 as uuidv4 } from "uuid";
import useEmit from "~/hooks/useEmit";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { type QuestionData } from "~/server/socket/setup";

enum QuestionRole {
  USER = "User",
  CHATBOT = "OSKM GPT"
}

interface ChatMessage {
  id: string;
  sender: QuestionRole;
  message: string;
}

const schema = z.object({
  text: z.string().min(1)
});

type FormValues = z.infer<typeof schema>;

const Chat: NextPage = () => {
  const session = useSession({ required: true });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socketMessage, setSocketMessage] = useState<QuestionData>();
  const [canAsk, setCanAsk] = useState(true);

  const messageEmit = useEmit("message", {
    onError: () => {
      setCanAsk(false);
    }
  });

  const { register, handleSubmit, reset } = useForm<FormValues>();

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

  // Appending GPT Message
  useEffect(() => {
    if (socketMessage) {
      const gptMessage = messages.find(
        (item) => item.id === socketMessage.questionId
      );
      if (gptMessage) {
        gptMessage.message = gptMessage.message.concat(socketMessage.message);
      } else {
        setMessages([
          ...messages,
          {
            id: socketMessage.questionId,
            sender: QuestionRole.CHATBOT,
            message: socketMessage.message
          }
        ]);
      }
    }
  }, [socketMessage]);

  useSubscription("question", (data) => {
    setSocketMessage(data);
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setMessages([
      ...messages,
      { id: uuidv4(), sender: QuestionRole.USER, message: data.text }
    ]);

    let history = "";
    messages.slice(-10).forEach((chat, index) => {
      if (chat.sender === QuestionRole.USER) {
        history += `Human: ${chat.message}`;
      } else {
        history += `AI: ${chat.message}`;
      }

      if (index !== messages.length - 1) {
        history += "\n";
      }
    });

    if (session.data) {
      messageEmit.mutate({
        questionId: uuidv4(),
        role: QuestionRole.USER,
        message: data.text,
        chatHistory: history
      });
    }

    reset();
    scrollToBottomOfList();
  };

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter") void handleSubmit(onSubmit)(event);
  };

  return (
    <Layout title='Chat'>
      <Flex h={"92vh"} direction={"column"}>
        <Flex
          h={"full"}
          w={"full"}
          direction={"column"}
          bg={"gray"}
          p={"1rem"}
          rowGap={"1rem"}
        >
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
                    item.sender === QuestionRole.USER
                      ? "rgba(255, 255, 255, 0.50)"
                      : "rgba(17, 117, 132, 0.50)"
                  }
                  color={item.sender === QuestionRole.USER ? "black" : "white"}
                  padding={"10px"}
                  borderRadius={
                    item.sender === QuestionRole.USER
                      ? "10px 10px 0px 10px"
                      : "10px 10px 10px 0px"
                  }
                  width={"75%"}
                  placeSelf={
                    item.sender === QuestionRole.USER ? "end" : "start"
                  }
                  alignItems={
                    item.sender === QuestionRole.USER ? "end" : "start"
                  }
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
          <Flex
            as={"form"}
            w={"full"}
            columnGap={"1rem"}
            onSubmit={void handleSubmit(onSubmit)}
          >
            <Textarea
              rows={1}
              bg={"white"}
              color={"black"}
              autoFocus
              onKeyDown={onKeyDownCustom}
              disabled={!canAsk}
              {...register("text")}
            />
            <Button
              type='submit'
              rounded={"lg"}
              px={"1rem"}
              py={"0.25rem"}
              bg={"#6366f1"}
            >
              Submit
            </Button>
            <Button onClick={() => void signOut()}>Sign Out</Button>
          </Flex>
          {!canAsk ? (
            <Text color={"black"} fontWeight={700}>
              You have reached your daily limit
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Chat;

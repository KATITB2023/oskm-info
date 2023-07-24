/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import AddMessageForm from "~/components/AddMessageForm";
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

interface Tries {
  id: string;
  tries: number;
  startTime: Date;
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

  useEffect(() => {
    if (session.data?.user.id) {
      const request = indexedDB.open("ChatbotTries");
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("triesStore")) {
          db.createObjectStore("triesStore", { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        const transaction = db.transaction("triesStore", "readwrite");
        const store = transaction.objectStore("triesStore");

        const getRequest = store.get(session.data.user.id);

        getRequest.onsuccess = () => {
          const data = getRequest.result as Tries;

          if (data) {
            const curDate = new Date();
            if (curDate.getDate() != data.startTime.getDate()) {
              setCanAsk(true);
              const putRequest = store.put({
                id: session.data.user.id,
                tries: 1,
                startTime: new Date()
              });
              putRequest.onsuccess = () => {
                console.log("Reset success");
              };
            } else {
              if (data.tries > 2) {
                setCanAsk(false);
              }
            }
          }
        };
      };
    }
  }, [session.data?.user.id]);

  const messageEmit = useEmit("message");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const request = indexedDB.open("ChatbotTries");
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("triesStore")) {
        db.createObjectStore("triesStore", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const transaction = db.transaction("triesStore", "readwrite");
      const store = transaction.objectStore("triesStore");

      const getRequest = store.get(session.data?.user.id as string);

      getRequest.onsuccess = () => {
        const data = getRequest.result as Tries;

        if (data) {
          console.log(data.tries, "tries");
          if (data.tries > 1) {
            setCanAsk(false);
          } else {
            data.tries = data.tries + 1;

            const putRequest = store.put(data);
            putRequest.onsuccess = () => {
              console.log("Put success");
            };
          }
        } else {
          const addRequest = store.add({
            id: session.data?.user.id as string,
            tries: 1,
            startTime: new Date()
          });
          addRequest.onsuccess = () => {
            console.log("Add success");
          };
        }
      };
    };

    if (canAsk) {
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

      messageEmit.mutate({
        questionId: uuidv4(),
        role: QuestionRole.USER,
        message: data.text,
        chatHistory: history
      });

      reset();
      scrollToBottomOfList();
    }
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

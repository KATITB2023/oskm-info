/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Button,
  Flex,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBreakpointValue,
  Icon,
  Tooltip,
  Show
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import { v4 as uuidv4 } from "uuid";
import useEmit from "~/hooks/useEmit";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { type QuestionData } from "~/server/socket/setup";
import { HiMinus } from "react-icons/hi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

const Chat = () => {
  const { data: session } = useSession();
  const isLg = useBreakpointValue({ base: false, lg: true });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socketMessage, setSocketMessage] = useState<QuestionData>();
  const [canAsk, setCanAsk] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const messageContainer = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      text: ""
    }
  });

  const messageEmit = useEmit("message", {
    onError: () => {
      setCanAsk(false);
    }
  });

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

    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessage]);

  useSubscription("question", (data) => {
    setSocketMessage(data);
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
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

    if (session) {
      messageEmit.mutate({
        questionId: uuidv4(),
        role: QuestionRole.USER,
        message: data.text,
        chatHistory: history
      });
    }

    reset();
  };

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter") void handleSubmit(onSubmit)(event);
  };

  return (
    <>
      <Show above='lg'>
        <Tooltip
          hasArrow
          defaultIsOpen
          label='Click me for more knowledge'
          placement='top'
          fontSize={"18px"}
          p={2}
          bgColor={"rgba(17, 117, 132, 1)"}
          borderRadius={"10px"}
        >
          <Image
            src='images/chat/bot-gif.gif'
            alt='mascot'
            w='12rem'
            position={"absolute"}
            right={10}
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />
        </Tooltip>
      </Show>
      <Show below='lg'>
        <Tooltip
          hasArrow
          defaultIsOpen
          label='Click me for more knowledge'
          placement='bottom'
          fontSize={"18px"}
          p={2}
          bgColor={"rgba(17, 117, 132, 1)"}
          borderRadius={"10px"}
        >
          <Image
            src='images/chat/bot-gif.gif'
            alt='mascot'
            w='12rem'
            onClick={onOpen}
          />
        </Tooltip>
      </Show>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />

        <ModalContent
          containerProps={{
            alignItems: isLg ? "end" : "center",
            justifyContent: isLg ? "flex-end" : "center",
            px: isLg ? "2rem" : "1rem"
          }}
          borderRadius={"20px 20px 0px 20px"}
          backgroundImage={"/images/chat/chat-bg.png"}
          position={"relative"}
          h={"40rem"}
        >
          <Flex direction={"column"} zIndex={1}>
            <Flex h={"full"} w={"full"}>
              <Image
                borderRadius={"20px 20px 0px 20px"}
                src='images/chat/spiral.png'
                alt='spiral'
                position={"absolute"}
                loading='lazy'
              />
              <Image
                src='images/chat/spiral top.png'
                alt='spiral'
                position={"absolute"}
                loading='lazy'
                right={5}
              />
              <Image
                src='images/chat/moon.png'
                alt='moon'
                position={"absolute"}
                bottom={0}
                right={0}
                loading='lazy'
              />
            </Flex>
          </Flex>
          <Flex h={"full"} w={"full"} direction={"column"} zIndex={2}>
            <Flex
              bgColor={"rgba(29, 2, 99, 0.40)"}
              justifyContent={"end"}
              color={"white"}
              p={"1rem"}
            >
              <Icon
                as={HiMinus}
                width={25}
                height={25}
                onClick={onClose}
                _hover={{ cursor: "pointer" }}
              />
            </Flex>
            {session ? (
              <Flex
                overflowY={"auto"}
                direction={"column"}
                h={"full"}
                p={"1rem"}
                rowGap={"1rem"}
                ref={messageContainer}
              >
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  mx={"1rem"}
                  rowGap={"10px"}
                >
                  <Image src='images/chat/mascot.png' alt='mascot' w='12rem' />
                  <Text
                    bgColor={"rgba(17, 117, 132, 0.50)"}
                    p={"1rem"}
                    color={"white"}
                    borderRadius={"10px 10px 10px 10px"}
                    boxShadow={"0px 4px 11px 0px rgba(0, 0, 0, 0.25)"}
                    textAlign={"center"}
                  >
                    Welcome to OSKM Interactive Bot. Ask me any questions
                  </Text>
                </Flex>
                <Flex direction={"column"} h={"full"} paddingY={"1rem"}>
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
                      color={
                        item.sender === QuestionRole.USER ? "black" : "white"
                      }
                      padding={"10px"}
                      borderRadius={
                        item.sender === QuestionRole.USER
                          ? "10px 10px 0px 10px"
                          : "10px 10px 10px 0px"
                      }
                      boxShadow={
                        item.sender === QuestionRole.USER
                          ? ""
                          : "0px 4px 11px 0px rgba(0, 0, 0, 0.25)"
                      }
                      width={"75%"}
                      placeSelf={
                        item.sender === QuestionRole.USER ? "end" : "start"
                      }
                      alignItems={
                        item.sender === QuestionRole.USER ? "end" : "start"
                      }
                      marginBottom={"28px"}
                    >
                      <Text
                        as={"p"}
                        whiteSpace={"pre-line"}
                        lineHeight={"1.25"}
                      >
                        {item.message}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            ) : (
              <Flex
                w='full'
                h='full'
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex
                  w='60%'
                  bgColor={"rgba(1, 1, 1, 0.22)"}
                  h='60%'
                  borderRadius={"30px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  textAlign={"center"}
                  p='2rem'
                  direction={"column"}
                  rowGap={12}
                >
                  <Text color={"white"}>
                    Please login to your account to access the chatbot
                  </Text>
                  <Button fontFamily='SomarRounded-Bold'>
                    <Link href='/login'>Login</Link>
                  </Button>
                </Flex>
              </Flex>
            )}

            {!canAsk && (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>You have reached your daily limit</AlertTitle>
              </Alert>
            )}

            {session && (
              <Flex
                bgColor={"rgba(29, 2, 99, 0.25)"}
                as={"form"}
                w={"full"}
                columnGap={"1rem"}
                p={"0.5rem 2rem"}
                onSubmit={void handleSubmit(onSubmit)}
              >
                <Textarea
                  placeholder='Type here...'
                  background={"transparent"}
                  outline={"none"}
                  border={"none"}
                  rows={1}
                  color={"white"}
                  resize={"none"}
                  autoFocus
                  onKeyDown={onKeyDownCustom}
                  disabled={!canAsk}
                  {...register("text")}
                />
                <Button type='submit' variant={"unstyled"} color={"white"}>
                  <IoPaperPlaneOutline size={25} />
                </Button>
              </Flex>
            )}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chat;

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AddMessageForm from "~/components/AddMessageForm";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { api } from "~/utils/api";

const Chat: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const userPair = api.message.getUser.useQuery({ pairId }).data;

  const messageQuery = api.message.infinite.useInfiniteQuery(
    { pairId },
    {
      getPreviousPageParam: (d) => d.prevCursor
    }
  );

  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    messageQuery;

  // List of messages that are rendered
  const [messages, setMessages] = useState(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.items).flat();
    return msgs;
  });

  // Function to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Message[]) => {
    setMessages((current) => {
      const map: Record<Message["id"], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;

      for (const msg of incoming ?? []) map[msg.id] = msg;

      return Object.values(map).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    });
  }, []);

  // When new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

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

  // Subscribe to new posts and add
  useSubscription("add", (post) => {
    if (
      post.receiverId === session?.user.id ||
      post.senderId === session?.user.id
    ) {
      addMessages([post]);
    }
  });

  // Currently typing state
  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);

  useSubscription("whoIsTyping", (data) => {
    setCurrentlyTyping(data);
  });

  return (
    <Layout title='Chat'>
      <Flex h={"92vh"} direction={"column"}>
        <Flex h={"full"} w={"full"} direction={"column"} bg={"gray"} p={"1rem"}>
          <Flex overflowY={"auto"} direction={"column"} h={"full"}>
            <Button
              data-testid='loadMore'
              onClick={() => void fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
              className='rounded bg-indigo-500 px-4 py-2 text-white disabled:opacity-40'
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
            <Flex
              rowGap={"1rem"}
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
                >
                  <Flex as={"header"} columnGap={"2px"}>
                    <h3>
                      {item.senderId === userPair?.id
                        ? userPair.nim
                        : session?.user.name ?? "Me"}
                    </h3>
                    <h3 className='text-gray-500'>
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "short",
                        timeStyle: "short"
                      }).format(item.createdAt)}
                    </h3>
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
            <AddMessageForm onMessagePost={() => scrollToBottomOfList()} />
            <p className='h-2 italic text-gray-400'>
              {currentlyTyping.length
                ? `${currentlyTyping.join(", ")} typing...`
                : ""}
            </p>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Chat;

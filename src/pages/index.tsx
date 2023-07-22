import { Flex } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "~/layout";

const ChatHome: NextPage = () => {
  useSession({ required: true });

  return (
    <Layout title='Home'>
      <Flex minH={"100vh"}>
        <Flex w={"full"} h={"full"} direction={"column"}>
          <Link href={`chat`}>Chat our chatbot</Link>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ChatHome;

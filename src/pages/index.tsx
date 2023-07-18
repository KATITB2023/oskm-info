import { Flex } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "~/layout";
import { api } from "~/utils/api";

const ChatHome: NextPage = () => {
  useSession({ required: true });
  const availableUsers = api.message.availableUser.useQuery();

  return (
    <Layout title='Home'>
      <Flex minH={"100vh"}>
        <Flex w={"full"} h={"full"} direction={"column"}>
          {availableUsers.isLoading ? <p>Loading</p> : <></>}
          {availableUsers.data?.map((each, i) => {
            return (
              <Link href={`chat/${each.id}`} key={i}>
                Chat {each.nim}
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ChatHome;

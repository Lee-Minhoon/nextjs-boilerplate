import { useGetPost } from "@/apis";
import { PostCard } from "@/containers";
import { useHasScroll, useLayout } from "@/hooks";
import { QueryParser } from "@/utils";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";

const PostPage = () => {
  const { Layout } = useLayout();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: post } = useGetPost(QueryParser.toNumber(router.query.id));
  const hasScroll = useHasScroll(ref.current);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          ref={ref}
          flex={1}
          direction={"column"}
          overflowY={"auto"}
          p={0.5}
          pr={hasScroll ? 2 : 0.5}
        >
          <PostCard data={post} />
        </Flex>
      </Layout>
    </>
  );
};

export default PostPage;

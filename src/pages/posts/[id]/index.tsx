import { useGetPost } from "@/apis";
import { ResponsiveLayout } from "@/components";
import { PostCard } from "@/containers";
import { useHasScroll } from "@/hooks";
import { QueryParser } from "@/utils";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { data: post } = useGetPost(QueryParser.toNumber(router.query.id));
  const { ref, hasScroll } = useHasScroll();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <Box ref={ref} overflowY={"auto"} pr={hasScroll ? "2" : "0.5"}>
          <PostCard data={post} />
        </Box>
      </ResponsiveLayout>
    </>
  );
};

export default PostPage;

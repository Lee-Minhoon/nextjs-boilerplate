import { PageOptions, ViewOptions } from "@/components";
import { ViewQueries } from "@/constants";
import { PostUtils, PostsByCursor, PostsByPage } from "@/containers";
import useLayout from "@/hooks/useLayout";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const PostsAllPage = () => {
  const { Layout } = useLayout();

  const router = useRouter();
  const viewOption = router.query?.view as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Page:
        return <PostsByPage />;
      case ViewQueries.CursorButton:
      case ViewQueries.CursorObserver:
        return (
          <PostsByCursor
            usesObserver={viewOption === ViewQueries.CursorObserver}
          />
        );
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction={"column"} gap={4} h={"100%"}>
          <Flex justifyContent={"space-between"}>
            <PostUtils />
            <Flex gap={4}>
              <ViewOptions />
              <PageOptions />
            </Flex>
          </Flex>
          {display}
        </Flex>
      </Layout>
    </>
  );
};

export default PostsAllPage;

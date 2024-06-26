import {
  PageOptions,
  ResponsiveLayout,
  Search,
  ViewOptions,
} from "@/components";
import { ViewQueries } from "@/constants";
import {
  PostGridView,
  PostListView,
  PostTableView,
  PostUtils,
} from "@/containers";
import { useSafePush } from "@/hooks";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useMemo } from "react";

const PostsAllPage = () => {
  const { router, push } = useSafePush();
  const viewOption = router.query?.view as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Table:
        return <PostTableView />;
      case ViewQueries.List:
        return <PostListView />;
      case ViewQueries.Grid:
        return <PostGridView />;
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
      <ResponsiveLayout>
        <Flex direction={"column"} gap={"4"} h={"100%"}>
          <PostUtils />
          <Flex justifyContent={"space-between"} gap={"4"} wrap={"wrap"}>
            <Search
              onSubmit={(search) =>
                push({
                  pathname: router.pathname,
                  query: { ...router.query, search },
                })
              }
            />
            <Flex gap={"4"}>
              <ViewOptions />
              <PageOptions />
            </Flex>
          </Flex>
          {display}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default PostsAllPage;

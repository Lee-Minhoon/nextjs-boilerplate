import { useGetPostsByOffset } from "@/apis";
import Layout from "@/components/Layout";
import PageOptions from "@/components/PageOptions";
import Pagination from "@/components/Pagination";
import ViewOptions from "@/components/ViewOptions";
import PostsTable from "@/containers/posts/PostsTable";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

const PostsOffsetPage = () => {
  const router = useRouter();
  const page = router.query?.page ? Number(router.query?.page) : 1;
  const limit = router.query?.limit ? Number(router.query?.limit) : 10;

  const { data } = useGetPostsByOffset({
    offset: (page - 1) * limit,
    limit,
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction={"column"} gap={4}>
          <Flex justifyContent={"space-between"}>
            <Flex gap={4}>
              <ViewOptions />
              <PageOptions />
            </Flex>
          </Flex>
          <PostsTable posts={data?.data ?? []} />
          <Pagination
            currentPage={page}
            limit={limit}
            total={data?.total ?? 0}
            onChange={(page) =>
              router.push({ query: { ...router.query, page } })
            }
          />
        </Flex>
      </Layout>
    </>
  );
};

export default PostsOffsetPage;

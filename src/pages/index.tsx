import { Layout } from "@/components";
import { SigninForm } from "@/containers";
import { Center } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Center>
          <SigninForm />
        </Center>
      </Layout>
    </>
  );
}

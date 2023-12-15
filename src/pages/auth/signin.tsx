import { CenteredLayout } from "@/components";
import { SigninForm } from "@/containers";
import Head from "next/head";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenteredLayout>
        <SigninForm />
      </CenteredLayout>
    </>
  );
};

export default SigninPage;
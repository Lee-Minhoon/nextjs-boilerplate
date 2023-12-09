import { useGetUser } from "@/apis";
import { useLayout } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const UserPage = () => {
  const { Layout } = useLayout();

  const router = useRouter();
  const { data: user } = useGetUser(
    router.query?.id ? +router.query.id : undefined
  );

  const attributes = useMemo(
    () => [
      { label: "Approved", value: user?.approved ? "Yes" : "No" },
      { label: "Email", value: user?.email },
      { label: "Phone", value: user?.phone },
    ],
    [user]
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Card>
          <CardHeader>
            <Heading>{user?.name}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {attributes.map((attribute) => (
                <Box key={attribute.label}>
                  <Heading size="xs" textTransform="uppercase">
                    {attribute.label}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {attribute.value}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default UserPage;

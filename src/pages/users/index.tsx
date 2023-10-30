import { useCreateTestUsers, useResetTestUsers } from "@/apis";
import Layout from "@/components/Layout";
import UserForm from "@/containers/users/UserForm";
import UsersAll from "@/containers/users/UsersAll";
import UsersByCursor from "@/containers/users/UsersByCursor";
import UsersByOffset from "@/containers/users/UsersByOffset";
import {
  Button,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Head from "next/head";

const tabs = [
  "Users",
  "Users Offset",
  "Users Cursor (Button)",
  "Users Cursor (Observer)",
];
const count = 50;

const Users = () => {
  const { mutate: createTestUsers, isLoading: createTestUsersLoading } =
    useCreateTestUsers(count);
  const { mutate: resetTestUsers, isLoading: restTestUsersLoading } =
    useResetTestUsers(count);

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
          <Flex gap={4}>
            <Button
              flex={1}
              onClick={() => createTestUsers({})}
              isDisabled={createTestUsersLoading}
            >
              {`Create ${count} Users`}
            </Button>
            <Button
              flex={1}
              onClick={() => resetTestUsers({})}
              isDisabled={restTestUsersLoading}
            >
              {`Reset Users`}
            </Button>
          </Flex>
          <UserForm />
          <Divider />
          <Tabs variant="enclosed">
            <TabList>
              {tabs.map((tab) => (
                <Tab key={tab}>{tab}</Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersAll />
              </TabPanel>
              <TabPanel>
                <UsersByOffset />
              </TabPanel>
              <TabPanel>
                <UsersByCursor />
              </TabPanel>
              <TabPanel>
                <UsersByCursor observe />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Layout>
    </>
  );
};

export default Users;
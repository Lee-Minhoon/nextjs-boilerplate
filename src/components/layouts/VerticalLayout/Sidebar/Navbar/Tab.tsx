import { Nav } from "@/constants";
import useBgColor from "@/hooks/useBgColor";
import { Center, Flex, Icon, ListItem, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";

interface TabProps {
  nav: Nav;
  isActivated: boolean;
}

const Tab = ({ nav, isActivated }: TabProps) => {
  const bgColor = useBgColor();

  return (
    <ListItem key={nav.label}>
      <Link key={nav.label} href={{ pathname: nav.pathname, query: nav.query }}>
        <Flex
          bgColor={isActivated ? bgColor : "transparent"}
          align={"center"}
          p={4}
          gap={4}
          borderRadius={"md"}
        >
          <Tooltip
            hasArrow
            label={nav.label}
            display={{ base: "block", xl: "none" }}
          >
            <Center
              w={8}
              h={8}
              bgColor={isActivated ? "primary.500" : "transparent"}
              border={"1px solid"}
              borderColor={isActivated ? "transparent" : "primary.500"}
              borderRadius={"md"}
            >
              <Icon
                as={nav.icon}
                color={isActivated ? "white" : "primary.500"}
              />
            </Center>
          </Tooltip>
          <Text display={{ base: "none", xl: "initial" }}>{nav.label}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
};

export default Tab;

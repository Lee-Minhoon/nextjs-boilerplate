import { findNavInHierarchy, navs } from "@/constants";
import { UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import NavbarTab from "./navbar.tab";

const Navbar = () => {
  const router = useRouter();

  const hierarchy = useMemo(
    () => findNavInHierarchy(router.pathname),
    [router.pathname]
  );

  return (
    <UnorderedList
      display={"flex"}
      flexDirection={"column"}
      listStyleType={"none"}
      m={"0"}
      py={"4"}
      gap={"4"}
    >
      {navs.map((nav) => (
        <NavbarTab
          key={nav.label}
          nav={nav}
          isActivated={hierarchy.includes(nav)}
        />
      ))}
    </UnorderedList>
  );
};

export default Navbar;

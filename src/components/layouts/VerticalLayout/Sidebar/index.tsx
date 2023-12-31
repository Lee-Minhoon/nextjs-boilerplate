import useBgColor from "@/hooks/useBgColor";
import { Box, Divider } from "@chakra-ui/react";
import SidebarFooter from "./Footer";
import SidebarHeader from "./Header";
import Navbar from "./Navbar";

const Sidebar = () => {
  const bgColor = useBgColor();

  return (
    <Box
      as={"aside"}
      display={"flex"}
      flexDirection={"column"}
      bgColor={bgColor}
      w={{ base: 24, xl: 64 }}
      p={4}
      h={"100vh"}
      ml={{ base: -24, lg: 0 }}
      transition={"margin-left 0.3s ease-in-out"}
    >
      <SidebarHeader />
      <Divider />
      <Navbar />
      <SidebarFooter />
    </Box>
  );
};

export default Sidebar;

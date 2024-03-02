import { useAlphaColor } from "@/hooks";
import { Box, Divider } from "@chakra-ui/react";
import { HorizontalLayoutNavbar } from "./HorizontalLayoutNavbar";
import HorizontalLayoutSidebarFooter from "./HorizontalLayoutSidebarFooter";
import HorizontalLayoutSidebarHeader from "./HorizontalLayoutSidebarHeader";

const HorizontalLayoutSidebar = () => {
  const alphaColor = useAlphaColor();

  return (
    <Box
      as={"aside"}
      display={"flex"}
      flexDirection={"column"}
      bgColor={alphaColor(50)}
      w={{ base: "24", xl: "64" }}
      p={"4"}
      h={"100vh"}
      ml={{ base: "-24", lg: "0" }}
      transition={"margin-left 0.3s ease-in-out"}
    >
      <HorizontalLayoutSidebarHeader />
      <Divider />
      <HorizontalLayoutNavbar />
      <HorizontalLayoutSidebarFooter />
    </Box>
  );
};

export default HorizontalLayoutSidebar;
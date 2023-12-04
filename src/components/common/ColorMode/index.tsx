import { Icon, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      label={colorMode === "light" ? "Dark Mode" : "Light Mode"}
      placement={"auto"}
    >
      <IconButton aria-label={"theme"} onClick={toggleColorMode} size={"sm"}>
        <Icon as={colorMode === "light" ? FiMoon : FiSun} />
      </IconButton>
    </Tooltip>
  );
};

export default ColorMode;

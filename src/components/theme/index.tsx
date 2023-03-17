// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "futura",
    body: "futura",
  },
  colors: {
    brand: {
      100: "#F6F9FC", // Lighter background color
      500: "#364f6b", // Main background color
      700: "#1a2634", // Darker background color
      900: "#102027", // Darkest background color
    },
  },
});

export default theme;
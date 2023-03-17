import * as React from "react";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { Stats } from "./components/Stats";
import theme from "./components/theme";
import { Header } from "./components/Header";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <VStack width="100%" spacing={0}>
      <Header />
      <Stats />
    </VStack>
  </ChakraProvider>
);

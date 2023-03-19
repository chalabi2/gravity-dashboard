import * as React from "react";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { Stats } from "./components/Stats";
import theme from "./components/theme/theme";
import { Header } from "./components/Header";
import { Background } from "./components/theme/Background";
import { Flares } from "./components/theme/flares";
import { MobileWarning } from "./components/MobileWarning";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Background
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      objectFit="cover"
      style={{ opacity: 0.20 }}
    />
    <Flares />
    <MobileWarning>
      <VStack width="100%" spacing={0}>
        <Header />
        <Stats />
      </VStack>
    </MobileWarning>
  </ChakraProvider>
);

import * as React from "react";
import { useState, useEffect } from "react";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { Stats } from "./components/Stats";
import theme from "./components/theme/theme";
import { Header } from "./components/Header";
import { Background } from "./components/theme/Background";
import { Flares } from "./components/theme/flares";
import { Fonts } from "./components/theme/theme";
import { LoadingScreen } from "./components/LoadingScreen";
import { FeePrice } from "./types"
import { getAverageFees } from "./components/calculations/feeQuery"; // Import your API function

export const App: React.FC = () => {
  const [feePrices, setFeePrices] = useState<FeePrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const feeData = await getAverageFees();
      setFeePrices(Array.isArray(feeData) ? feeData : [feeData]);
      setIsLoading(false);
      setIsLoaded(true); // Set isLoaded to true here
    };
  
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      
      {isLoading ? <LoadingScreen isLoaded={isLoaded} /> :  
        <>
        <Fonts />
        <Background
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={-1}
          objectFit="cover"
          style={{ opacity: 0.2 }}
        />
        <Flares />
        <VStack 
            width="100%" 
            spacing={0}>
          <Header />
        <Stats feePrices={feePrices} setFeePrices={setFeePrices} />
        </VStack>  
        </>
        }

    </ChakraProvider>
  );
};

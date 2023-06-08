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
import { TotalFee } from "./types";
import { getCombinedFeeData } from "./components/calculations/feeQuery";

export const App: React.FC = () => {
  const [totalFees, setTotalFees] = useState<TotalFee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const feeData = await getCombinedFeeData();
      // Set a timeout to delay the disappearance of the loading screen
      setTimeout(() => {
        setTotalFees(Array.isArray(feeData) ? feeData : [feeData]);
      }, 2000); // Delay for 2 seconds
    };
  
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
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
      {totalFees.length === 0 ? (
        <LoadingScreen isLoaded={false} />
      ) : (
        <>
          <Fonts />
          <VStack width="100%" spacing={0}>
            <Header />
            <Stats totalFees={totalFees} setTotalFees={setTotalFees} />
          </VStack>
        </>
      )}
    </ChakraProvider>
  );
};

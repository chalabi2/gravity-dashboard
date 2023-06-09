import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Link,
  useColorModeValue,
  Container,
  HStack,
  useMediaQuery
} from "@chakra-ui/react";
import { Pmtr } from "./grid/Pmtr";
import { ChainFee } from "./grid/ChainFees";
import { Assets } from "./grid/Assets";
import { BridgeVolume } from "./grid/BridgeVolume";
import { TotalFee } from "../types";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export const Stats: React.FC<{
  totalFees: TotalFee[];
  setTotalFees: React.Dispatch<React.SetStateAction<TotalFee[]>>;
}> = ({ totalFees, setTotalFees }) => {
  const windowSize = useWindowSize();
  const isLargeScreen = windowSize >= 1414;
  const [isLargerThan767] = useMediaQuery("(min-width: 767px)");

  const BottomTextColor = useColorModeValue("black", "white");

  return (
    <Container py={{base: "-50px", md: "50px"}} maxW="8xl" centerContent>
      <Box maxWidth="8xl" width="100%"></Box>
      {isLargeScreen ? (
        <HStack
          shadow={"dark-lg"}
          spacing={2}
          p={4}
          borderRadius={4}
          sx={{
            backdropFilter: "blur(2px)",
            bgColor: "transparent",
          }}
        >
          <VStack>
            <Pmtr />
            {isLargerThan767 ? (
              <HStack>
                <BridgeVolume />
                <Assets />
              </HStack>
            ) : (
              <VStack>
                <BridgeVolume />
                <Assets />
              </VStack>
            )}
          </VStack>
          <ChainFee totalFees={totalFees} setTotalFees={setTotalFees} />
        </HStack>
      ) : (
        <VStack
          shadow={"dark-lg"}
          spacing={2}
          p={4}
          borderRadius={4}
          sx={{
            backdropFilter: "blur(2px)",
            bgColor: "transparent",
          }}
        >
          <Pmtr />
           {isLargerThan767 ? (
              <HStack>
                <BridgeVolume />
                <Assets />
              </HStack>
            ) : (
              <VStack>
                <BridgeVolume />
                <Assets />
              </VStack>
            )}
          <ChainFee totalFees={totalFees} setTotalFees={setTotalFees} />
        </VStack>
      )}
      <Text zIndex={0} textAlign="center" fontSize="sm" mt={4}>
        <Text textAlign="center" fontFamily="Futura">
          Data is feteched from:
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://www.coingecko.com/en/coins/graviton"
          >
            Coin Gecko
          </Link>
          |
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://github.com/Gravity-Bridge/gravity-info-api"
          >
            Gravity info API
          </Link>
          |
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://info.osmosis.zone/"
          >
            Osmosis price feed
          </Link>
          |
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://dune.com/"
          >
            Dune Analytics
          </Link>
        </Text>
      </Text>
      <HStack>
        <Text textAlign="center" fontFamily="Futura">
          Powered By
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://chandrastation.com"
          >
            Chandra Station
          </Link>
        </Text>
      </HStack>
    </Container>
  );
};

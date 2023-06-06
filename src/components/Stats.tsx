import * as React from "react";
import {
  Box,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Link,
  useColorModeValue,
  Container,
  HStack,
} from "@chakra-ui/react";
import { Pmtr } from "./grid/Pmtr";
import { ChainFee } from "./grid/ChainFees";
import { Assets } from "./grid/Assets";
import { BridgeVolume } from "./grid/BridgeVolume";
import { VolumeComparison } from "./grid/VolumeComparison";

export const Stats: React.FC = () => {
  const marginTopValue = useBreakpointValue({ base: "-50px", md: "0" });
  const pmtrWidth = useBreakpointValue({
    base: "331px",
    md: "732px !important",
  });
  const BottomTextColor = useColorModeValue("black", "white");
  const shadowColor = useColorModeValue("grey", "grey");

  return (
    <Container
    
    py={"50px"} maxW="8xl" centerContent>
      <Box 
      maxWidth="8xl" width="100%"></Box>
      <HStack
            shadow={"dark-lg"}
            spacing={2}
            p={4}
            borderRadius={4}
            sx={{
                
                  backdropFilter: 'blur(2px)',
                  bgColor: 'transparent'
            }}
      >
      <VStack >
        <Pmtr />
        <HStack>
          <BridgeVolume />
          <Assets />

        </HStack>

      </VStack>
      <ChainFee />
      </HStack>
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
          <Link
            _hover={{ textDecoration: "none", color: "blue" }}
            color={BottomTextColor}
            p="4px"
            fontFamily="futura"
            href="https://www.gravitybridge.net/"
          >
            Gravity Bridge 
          </Link>

          ® Is A Registered Trademark | Powered By
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

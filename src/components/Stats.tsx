import * as React from "react";
import { Box, VStack, Flex, Text, useBreakpointValue, Link, useColorModeValue, Container, HStack } from "@chakra-ui/react";
import { Pmtr } from "./grid/Pmtr";
import { ChainFee } from "./grid/ChainFees";
import { Assets } from "./grid/Assets";
import { BridgeVolume } from "./grid/BridgeVolume";
import { VolumeComparison } from "./grid/VolumeComparison";

export const Stats: React.FC = () => {
  const marginTopValue = useBreakpointValue({ base: "-50px", md: "0" });
  const pmtrWidth = useBreakpointValue({ base: "331px", md: "732px !important" });
  const BottomTextColor = useColorModeValue("black", "white");

  return (
 <Container py={18} maxW="8xl" centerContent>
  <Box
  maxWidth="8xl"
  width="100%"
  >
  </Box>
  <VStack
  spacing={2}
  >
    <Pmtr />
    <HStack>
      <BridgeVolume />
      <Assets />
    </HStack>
    <ChainFee />
    <VolumeComparison />
  </VStack>
  </Container>
  );
};

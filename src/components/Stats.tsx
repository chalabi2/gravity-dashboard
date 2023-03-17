import * as React from "react";
import {
  Box,
  VStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Pmtr } from "./grid/Pmtr";
import { ChainFee } from "./grid/ChainFees";
import { Assets } from "./grid/Assets";
import { BridgeVolume } from "./grid/BridgeVolume";
import { VolumeComparison } from "./grid/VolumeComparison";

export const Stats: React.FC = () => (
    <VStack minH="100vh" justifyContent="center" alignItems="center" marginTop="-0px" width="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        wrap="wrap"
        p={{ base: "14px" }}
        borderRadius="6px"
        maxWidth="736px"
        width="100%"
      >
        <Box maxWidth="736px" width="100%" m="10px">
          <Pmtr />
        </Box>
        <Flex flexDirection="column" width="100%">
          <Flex>
            <VStack>
              <Box width="360px" height="120px" maxWidth="100%">
                <ChainFee />
              </Box>
              <Box p="5px">
                <BridgeVolume />
              </Box>
            </VStack>
            <Spacer />
            <Assets />
          </Flex>
          <Box ml="10px" p="5px">
            <VolumeComparison />
          </Box>
        </Flex>
      </Flex>
    </VStack>
);

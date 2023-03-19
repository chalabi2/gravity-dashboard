import * as React from "react";
import { Box, VStack, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { Pmtr } from "./grid/Pmtr";
import { ChainFee } from "./grid/ChainFees";
import { Assets } from "./grid/Assets";
import { BridgeVolume } from "./grid/BridgeVolume";
import { VolumeComparison } from "./grid/VolumeComparison";

export const Stats: React.FC = () => {
  const marginTopValue = useBreakpointValue({ base: "-50px", md: "-150px" });
  const pmtrWidth = useBreakpointValue({ base: "331px", md: "736px" });

  return (
    <VStack
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        wrap="wrap"
        p={{ base: "14px" }}
        borderRadius="6px"
        maxWidth="736px"
        width="736ppx"
        marginTop={marginTopValue}
        ml={{ base: "0px", md: "50px" }}
      >
        <Box maxWidth={pmtrWidth} width="100%" m="10px">
          <Pmtr />
        </Box>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          width="100%" // Add this line
          justifyContent={{ base: "center", md: "center" }}
        >
          <VStack width="100%">
            {" "}
            <Box
              width={{ base: "100%", md: "360px" }}
              height="120px"
              maxWidth="100%"
              mb={{ base: "0px", md: 0 }}
            >
              <ChainFee />
            </Box>
            <Box
              width={{ base: "360px", md: "auto" }}
              p="5px"
              mb={{ base: "10px", md: 0 }}
              marginLeft={{base: "10px !important", md: "0" }}
            >
              <BridgeVolume />
            </Box>
          </VStack>
          <Box
            mb={{ base: "10px", md: 0 }}
            width={{ base: "330px", md: "auto" }}
            ml={{ base: "18px", md: "0" }}
            mt={{ base: "10px", md: "0" }}
          >
            <Assets />
          </Box>
        </Flex>
        <Box
          width={{ base: "340px", md: "100%" }}
          ml={{ md: "10px", base: "15px" }}
          p="5px"
        >
          <VolumeComparison />
        </Box>
      </Flex>
      <Text textAlign="center" fontSize="sm" mt={4}>
        Gravity Bridge Is A Registered Trademark | Powered By Chandra Station
      </Text>
    </VStack>
  );
};

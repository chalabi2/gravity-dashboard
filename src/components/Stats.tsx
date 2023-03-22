import * as React from "react";
import { Box, VStack, Flex, Text, useBreakpointValue, Link, useColorModeValue } from "@chakra-ui/react";
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
    <VStack
      minH="50vh"
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
        ml={{ base: "11px", md: "50px" }}
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
              ml={{base: "0px", md:"0"}}
            >
              <ChainFee />
            </Box>
            <Box
              width={{ base: "360px", md: "auto" }}
              p="5px"
              mb={{ base: "10px", md: 0 }}
              marginLeft={{base: "10px !important", md: "-0px !important" }}
            >
              <BridgeVolume />
            </Box>
          </VStack>
          <Box
            mb={{ base: "10px", md: 0 }}
            width={{ base: "330px", md: "auto" }}
            ml={{ base: "16px", md: "-5px" }}
            mt={{ base: "10px", md: "0" }}
          >
            <Assets />
          </Box>
        </Flex>
        <Box
          width={{ base: "340px", md: "100%" }}
          ml={{ md: "12px", base: "12px" }}
          p="5px"
        >
          <VolumeComparison />
        </Box>
      </Flex>
      <Text zIndex={0} textAlign="center" fontSize="sm" mt={4}>
      <Link _hover={{textDecoration: "none", color: "blue",}} color={BottomTextColor} p="4px"  fontFamily="futura" href="https://www.gravitybridge.net/" >Gravity Bridge ® </Link>Is A Registered Trademark | Powered By <Link _hover={{textDecoration: "none", color: "blue",}} color={BottomTextColor} p="4px"  fontFamily="futura" href="https://chandrastation.com" >Chandra Station</Link>
      <Text>
        Data is feteched from:
        <Link 
        _hover={{textDecoration: "none", color: "blue",}} 
        color={BottomTextColor} p="4px"  
        fontFamily="futura" href="https://www.coingecko.com/en/coins/graviton" >
        Coin Gecko |
          </Link>
          <Link 
        _hover={{textDecoration: "none", color: "blue",}} 
        color={BottomTextColor} p="4px"  
        fontFamily="futura" href="https://github.com/Gravity-Bridge/gravity-info-api" >
          Gravity Info API |
          </Link>
          <Link 
        _hover={{textDecoration: "none", color: "blue",}} 
        color={BottomTextColor} p="4px"  
        fontFamily="futura" href="https://github.com/Gravity-Bridge/gravity-info-api" >
          Dune Analytics
          </Link>
      </Text>
      </Text>
    </VStack>
  );
};

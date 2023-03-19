import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Logo } from "./theme/Logo";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const Header = () => {
  const headerTextColor = useColorModeValue("black", "white");

  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      paddingX="2rem"
      width="100%"
      height="135.52px"
      marginTop="25px"
    >
      <Box>
        <Logo marginBottom="-10px" height="200%" width="200%" />
        <Heading
          as="h1"
          size="lg"
          fontFamily="Futura MD BT"
          lineHeight="1.36"
          fontWeight="medium"
          letterSpacing="0.1em"
          color={headerTextColor}
          marginLeft="440px"
        >
          STATISTICS
        </Heading>
      </Box>
      <HStack spacing="49px">
        <ColorModeSwitcher />
        <Link
          fontFamily="Futura"
          fontWeight="light"
          fontSize="18px"
          color={headerTextColor}
          href="https://info.gravitychain.io:9000/"
          isExternal
          _hover={{
            textDecoration: "none",
            color: "blue",
          }}
        >
          API
        </Link>
        <Link
          fontFamily="Futura"
          fontWeight="light"
          fontSize="18px"
          color={headerTextColor}
          href="https://www.mintscan.io/gravity-bridge"
          isExternal
          _hover={{
            textDecoration: "none",
            color: "blue",
          }}
        >
          Block Explorer
        </Link>
        <Box
          as="button"
          borderRadius="5px"
          width="164.79px"
          height="40px"
          background="#211AC1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{
            background: "#3a2fcf", // Lighter background color on hover
            cursor: "pointer",
          }}
        >
          <Text color="#FFFFFF" fontSize="18px">
            Launch App
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
};

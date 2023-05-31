import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useColorMode,
    Link,
    IconButton,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    useMediaQuery,
  } from "@chakra-ui/react";

export default function Footer() {
    const BottomTextColor = useColorModeValue("black", "white");

return (
    <>
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
          </>
)

}
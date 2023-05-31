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
import { Logo } from "./theme/Logo";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const headerTextColor = useColorModeValue("black", "white");
  const [isMobile] = useMediaQuery("(max-width: 1200px)");
  const { colorMode } = useColorMode();
  const drawerBgColor = colorMode === "dark" ? "black" : "white";

  const logoSize = useBreakpointValue({ base: "100%", md: "200%" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MobileMenuItems = () => (
    <VStack alignItems="center" spacing="1rem">
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
      <Link
      href="https://chandrastation.github.io/space-station/"
      >
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
          background: "#3a2fcf",
          cursor: "pointer",
        }}
      >
      <Text
        zIndex={5}
        fontFamily="Futura"
        fontWeight="light"
        fontSize="18px"
        color="white"
      >
        Bridge App
      </Text>
      </Box>
      </Link>
    </VStack>
  );

  const DesktopMenuItems = () => (
    <HStack mt="10px" spacing="49px">
      <ColorModeSwitcher />
      <Link
        fontFamily="Futura"
        fontWeight="light"
        fontSize="18px"
        color={headerTextColor}
        href="https://info.gravitychain.io/"
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
      <Link
      href="https://chandrastation.github.io/space-station/"
      >
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
          background: "#3a2fcf",
          cursor: "pointer",
        }}
      >
      <Text
        zIndex={5}
        fontFamily="Futura"
        fontWeight="light"
        fontSize="18px"
        color="white"
      >
        Bridge App
      </Text>
      </Box>
      </Link>
    </HStack>
  );

  return (
    <Flex
      ml={{ base: "-10", md: "0" }}
      alignItems="flex-start"
      justifyContent="space-between"
      paddingX="2rem"
      width="100%"
      height="135.52px"
      marginTop="20px"
    >
      <Box>
        {/* Update the height and width */}
        <Logo marginBottom="-10px" height={logoSize} width={logoSize} />
        <Heading
          as="h1"
          fontFamily="Futura"
          lineHeight="1.36"
          fontWeight="medium"
          letterSpacing="0.1em"
          color={headerTextColor}
          marginLeft={{ base: "220", md: "440px" }}
          fontSize={{ base: "18px", md: "30px" }}
        >
          STATISTICS
        </Heading>
      </Box>
      {isMobile ? (
        <>
          <IconButton
            icon={<HamburgerIcon boxSize={8} />}
            marginLeft="25px"
            variant="ghost"
            onClick={onOpen}
            display={{ base: "block", md: "block" }}
            aria-label={""}
            _hover={{
              textDecoration: "none",
              color: "blue",
            }}
          />
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent backgroundColor={drawerBgColor}>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <Text fontFamily="Futura">Menu</Text>
              </DrawerHeader>
              <DrawerBody>
                <MobileMenuItems />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <HStack spacing="49px">
          <DesktopMenuItems />
        </HStack>
      )}
    </Flex>
  );
};

import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
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
} from "@chakra-ui/react";
import { Logo } from "./theme/Logo";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const headerTextColor = useColorModeValue("black", "white");
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Text color="#FFFFFF" fontSize="18px">
          Launch App
        </Text>
      </Box>
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
          background: "#3a2fcf",
          cursor: "pointer",
        }}
      >
        <Text color="#FFFFFF" fontSize="18px">
          Launch App
        </Text>
      </Box>
    </HStack>
  );
  
  return (
    <Flex
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
        fontFamily="Futura MD BT"
        lineHeight="1.36"
        fontWeight="medium"
        letterSpacing="0.1em"
        color={headerTextColor}
        marginLeft={{base: "220", md: "440px"}}
        fontSize={{base: "18px", md: "30px"}}
      >
        STATISTICS
      </Heading>
    </Box>
      {isMobile ? (
      <>
        <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
            display={{ base: "block", md: "none" }} aria-label={""} 
            _hover={{
              textDecoration: "none",
              color: "blue",
            }}       />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Menu
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
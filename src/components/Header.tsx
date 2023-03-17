import {
    Box,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { Logo } from "../Logo";
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
        marginTop="30px"
      >
        <Box>
          <Logo height="200%" width="200%" />
          <Heading
            as="h1"
            size="lg"
            fontFamily="Futura Md BT"
            lineHeight="1.36"
            fontWeight="medium"
            letterSpacing="0.1em"
            color={headerTextColor}
            marginLeft="400px"
          >
            STATISTICS
          </Heading>
        </Box>
        <HStack spacing="49px">
          <ColorModeSwitcher />
          <Menu>
            <MenuButton
              as={Text}
              color={headerTextColor}
              fontSize="18px"
              fontWeight="light"
              rightIcon={<ChevronDownIcon />}
              fontFamily="Futura Lt BT"
            >
              API
            </MenuButton>
            <MenuList>
              <MenuItem>API Endpoint 1</MenuItem>
              <MenuItem>API Endpoint 2</MenuItem>
              <MenuItem>API Endpoint 3</MenuItem>
            </MenuList>
          </Menu>
          <Text
            fontFamily="Futura Lt BT"
            fontWeight="light"
            fontSize="18px"
            color={headerTextColor}
          >
            Block Explorer
          </Text>
          <Box
            as="button"
            borderRadius="5px"
            width="164.79px"
            height="40px"
            background="#211AC1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#FFFFFF" fontSize="18px">
              Launch App
            </Text>
          </Box>
        </HStack>
      </Flex>
    );
  };
  
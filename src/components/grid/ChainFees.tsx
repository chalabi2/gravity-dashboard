import {
  Box,
  Flex,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  useMediaQuery,
  HStack,
  Image,
  VStack,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { getBridgeFeeTotals, getChainFeeTotals } from "../calculations/fees";
import { BridgeFeeData, ChainFeeData } from "../../types";
import { useMenu } from "@chakra-ui/react";

interface ChainFeeProps {}

function formatCosmosNumber(number: number) {
  const formattedNumber = Math.floor(number / 1000000);
  return formattedNumber.toLocaleString("en-US");
}

function formatEthNumber(number: number) {
  const formattedNumber = number / 10 ** 18;
  return formattedNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const ChainFee: React.FC<ChainFeeProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBgText = useColorModeValue("white", "black");
  const [clickPosition, setClickPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const [chainFeesData, setChainFeesData] = useState<ChainFeeData[]>([]);
  const [bridgeFeesData, setBridgeFeesData] = useState<BridgeFeeData[]>([]);

  useEffect(() => {
    getChainFeeTotals().then((result) => {
      setChainFeesData(result);
    });
  }, []);

  useEffect(() => {
    getBridgeFeeTotals().then((result) => {
      setBridgeFeesData(result);

    });
  }, []);

  const getTotalChainFees = (denom: string) => {
    const entry = chainFeesData.find((item) => item.denom === denom);
    return entry ? entry.totalChainFees : 0;
  };

  const getTotalBridgeFees = (denom: string) => {
    const entry = bridgeFeesData.find((item) => item.denom === denom);
    return entry ? entry.totalBridgeFees : 0;
  };

  const handleClick = (event: React.MouseEvent) => {
    // Store the click position
    setClickPosition({
      x: event.clientX,
      y: event.clientY,
    });
    onOpen();
  };
  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const { isOpen: isMenuOpen } = useMenu();
  const [selectedMenuItem, setSelectedMenuItem] = useState("Fees");

  return (
    <Box
      onMouseEnter={() => setShowInfoIcon(true)}
      onMouseLeave={() => {
        if (!isOpen && !isMenuOpen) {
          setShowInfoIcon(false);
        }
      }}
      position="relative"
    >
      <Menu>
        <MenuButton
          color="white"
          as={Button}
          boxShadow="none"
          rightIcon={<ChevronDownIcon />}
          aria-label="More"
          position="absolute"
          top={1}
          right={0}
          size="md"
          variant="ghost"
          onClick={handleClick}
          zIndex={1}
          style={{
            opacity: showInfoIcon ? 1 : 0, // Set opacity based on showInfoIcon state
            transition: "opacity 0.3s ease-in-out", // Gradual opacity transition
          }}
          _hover={{
            bgColor: "transparent",
            boxShadow: "none",
          }}
          _focus={{
            bgColor: "transparent",
            boxShadow: "none",
          }}
          _active={{
            bgColor: "transparent",
            boxShadow: "none",
          }}
        />
        <MenuList
          width="25px"
          height="160px"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
        >
          <MenuItem
            onClick={() => setSelectedMenuItem("Fees")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Fees
          </MenuItem>
          <MenuItem
            onClick={() => setSelectedMenuItem("Totals")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Totals
          </MenuItem>
          <MenuItem
            onClick={() => setSelectedMenuItem("All Tokens")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            All Tokens
          </MenuItem>
          <MenuItem
            onClick={() => setSelectedMenuItem("Data Info")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Data Info
          </MenuItem>
        </MenuList>
      </Menu>
      <Box>
        {selectedMenuItem === "Fees" && (
          <Stack
            justify="flex-start"
            justifyContent="space-between"
            align="center"
            spacing="0px"
            width="xl"
            height="sm"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura MD BT"
              lineHeight="1.17"
              fontWeight="light"
              fontSize="24px"
              textTransform="capitalize"
              color="#FFFFFF"
              textAlign="center"
            >
              Fees
              <Box
                width={{ md: "300%", base: "15%" }}
                ml={{ md: "-40px", base: "128px" }}
                height="1px"
                bgColor="rgb(255,255,255, 0.5)"
                position={{ md: "relative", base: "sticky" }}
                bottom="1px"
              />
            </Text>

            <Flex pt={4} justifyContent="space-between" width="100%" height="100%">
              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={1}
                height="100%"
              >
                <Text
                  fontFamily="Futura MD BT"
                  fontWeight="light"
                  fontSize="20px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Chain Fees
                  <Box
                    width={{ md: "200%", base: "15%" }}
                    ml={{ md: "-40px", base: "128px" }}
                    height="1px"
                    bgColor="rgb(255,255,255, 0.5)"
                    position={{ md: "relative", base: "sticky" }}
                   
                  />
                </Text>
                <VStack alignItems="left" spacing={5}>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      USDC: {formatCosmosNumber(getTotalChainFees("USDC"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      WETH: {formatEthNumber(getTotalChainFees("WETH"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/18834/small/wstETH.png?1633565443"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      color="#FFFFFF"
                    >
                      wstETH: {formatEthNumber(getTotalChainFees("wstETH"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      USDT: {formatCosmosNumber(getTotalChainFees("USDT"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/9519/small/paxg.PNG?1568542565"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      PAXG: {formatEthNumber(getTotalChainFees("PAXG"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/20685/small/kuji-200x200.png?1637557201"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      KUJI: {formatCosmosNumber(getTotalChainFees("KUJI"))}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>

              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={0.7}
                height="100%"
              >
                <Text
                  fontFamily="Futura MD BT"
                  fontWeight="light"
                  fontSize="20px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Bridge Fees
                  <Box
                    width={{ md: "200%", base: "15%" }}
                    ml={{ md: "-40px", base: "128px" }}
                    height="1px"
                    bgColor="rgb(255,255,255, 0.5)"
                    position={{ md: "relative", base: "sticky" }}
                    
                  />
                </Text>
                <VStack alignItems="right" spacing={5}>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      WETH: {formatEthNumber(getTotalBridgeFees("WETH"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      USDC: {formatCosmosNumber(getTotalBridgeFees("USDC"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/25767/small/01_Luna_color.png?1653556122"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      LUNA: {formatCosmosNumber(getTotalBridgeFees("LUNA"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/8284/small/01_LunaClassic_color.png?1653547790"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      LUNC: {formatEthNumber(getTotalBridgeFees("WLUNC"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/18834/small/wstETH.png?1633565443"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      color="#FFFFFF"
                    >
                      wstETH: {formatEthNumber(getTotalBridgeFees("wstETH"))}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      WBTC: {formatCosmosNumber(getTotalBridgeFees("WBTC"))}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Flex>
          </Stack>
        )}
        {selectedMenuItem === "Totals" && (
          <Stack
            justify="flex-start"
            justifyContent="space-between"
            align="center"
            spacing="0px"
            width="xl"
            height="sm"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura MD BT"
              lineHeight="1.17"
              fontWeight="light"
              fontSize="24px"
              textTransform="capitalize"
              color="#FFFFFF"
              textAlign="center"
            >
              Fee Totals
              <Box
                width={{ md: "150%", base: "15%" }}
                ml={{ md: "-26px", base: "128px" }}
                height="1px"
                bgColor="rgb(255,255,255, 0.5)"
                position={{ md: "relative", base: "sticky" }}
                bottom="1px"
              />
            </Text>
            <Flex py={4} justifyContent="space-between" width="100%" height="100%">
              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={1}
                height="100%"
              >
                <Text
                  fontFamily="Futura MD BT"
                  fontWeight="light"
                  fontSize="20px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Chain Fees
                  <Box
                    width={{ md: "200%", base: "15%" }}
                    ml={{ md: "-40px", base: "128px" }}
                    height="1px"
                    bgColor="rgb(255,255,255, 0.5)"
                    position={{ md: "relative", base: "sticky" }}
                
                  />
                </Text>
                <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Total Chain Fees

          </Text>
          <Text
          pb={4}
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $10
          </Text>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Average Chain Fee

          </Text>
          <Text
          pb={4}
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $1
          </Text>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Most Common Fee

          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            ETH: 8k
          </Text>
              </VStack>

              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={1}
                height="100%"
              >
                <Text
                  fontFamily="Futura MD BT"
                  fontWeight="light"
                  fontSize="20px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Bridge Fees
                  <Box
                    width={{ md: "200%", base: "15%" }}
                    ml={{ md: "-40px", base: "128px" }}
                    height="1px"
                    bgColor="rgb(255,255,255, 0.5)"
                    position={{ md: "relative", base: "sticky" }}

                  />
                </Text>
                <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Total Bridge Fees

          </Text>
          <Text
          pb={4}
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $10
          </Text>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Average Bridge Fee

          </Text>
          <Text
          pb={4}
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $40
          </Text>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Most Common Fee

          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            ETH: 120k
          </Text>
              </VStack>
            </Flex>
          </Stack>
        )}
        {selectedMenuItem === "All Tokens" && (
           <Stack
           justify="flex-start"
           justifyContent="space-between"
           align="center"
           spacing="0px"
           width="xl"
           height="sm"
           maxWidth="100%"
           bg="rgba(0, 18, 183, 0.5)"
           borderRadius="6px"
         >
           <Text
           pt={2}
             fontFamily="Futura MD BT"
             lineHeight="1.17"
             fontWeight="light"
             fontSize="24px"
             textTransform="capitalize"
             color="#FFFFFF"
             textAlign="center"
           >
             All Tokens
             <Box
               width={{ md: "150%", base: "15%" }}
               ml={{ md: "-26px", base: "128px" }}
               height="1px"
               bgColor="rgb(255,255,255, 0.5)"
               position={{ md: "relative", base: "sticky" }}
               bottom="1px"
             />
           </Text>
           <Flex py={4} justifyContent="space-between" width="100%" height="100%">
             <VStack
               alignItems="center"
               spacing={4}
               flexGrow={1}
               height="100%"
               align="start"
               width="50%"
             >
               <Text
                 fontFamily="Futura MD BT"
                 fontWeight="light"
                 fontSize="20px"
                 textTransform="capitalize"
                 color="#FFFFFF"
               >
                 Chain Fees
                 <Box
                   width={{ md: "200%", base: "15%" }}
                   ml={{ md: "-40px", base: "128px" }}
                   height="1px"
                   bgColor="rgb(255,255,255, 0.5)"
                   position={{ md: "relative", base: "sticky" }}
               
                 />
               </Text>
               <Box
        width="75%"
        height="250px"
        overflowY="scroll"
        overflowX="hidden"
        css={{
          '&::-webkit-scrollbar': {
            width: '1px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
        }}
      >
        {chainFeesData.map((item) => (
          <Text key={item.denom}>
            {item.denom}: {item.totalChainFees}
          </Text>
        ))}
      </Box>
             </VStack>

             <VStack
               alignItems="center"
               spacing={4}
               flexGrow={1}
               height="100%"
               width="50%"
               align="start"
             >
               <Text
                 fontFamily="Futura MD BT"
                 fontWeight="light"
                 fontSize="20px"
                 textTransform="capitalize"
                 color="#FFFFFF"
               >
                 Bridge Fees
                 <Box
                   width={{ md: "200%", base: "15%" }}
                   ml={{ md: "-40px", base: "128px" }}
                   height="1px"
                   bgColor="rgb(255,255,255, 0.5)"
                   position={{ md: "relative", base: "sticky" }}

                 />
               </Text>
               <Box
        width="75%"
        height="250px"
        overflowY="scroll"
        overflowX="hidden"
        css={{
          '&::-webkit-scrollbar': {
            width: '1px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
        }}
      >
        {bridgeFeesData.map((item) => (
          <Text key={item.denom}>
            {item.denom}: {item.totalBridgeFees}
          </Text>
        ))}
      </Box>
             </VStack>
           </Flex>
         </Stack>
        )}
        {selectedMenuItem === "Data Info" && (
                    <Stack
                    justify="flex-start"
                    justifyContent="space-between"
                    align="center"
                    spacing="0px"
                    width="xl"
                    height="sm"
                    maxWidth="100%"
                    bg="rgba(0, 18, 183, 0.5)"
                    borderRadius="6px"
                  >
                    <Text
                    pt={2}
                      fontFamily="Futura MD BT"
                      lineHeight="1.17"
                      fontWeight="light"
                      fontSize="24px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                      textAlign="center"
                    >
                    Data Info
                      <Box
                        width={{ md: "150%", base: "15%" }}
                        ml={{ md: "-26px", base: "128px" }}
                        height="1px"
                        bgColor="rgb(255,255,255, 0.5)"
                        position={{ md: "relative", base: "sticky" }}
                        bottom="1px"
                      />
                    </Text>
                    <VStack pt={4} width="75%" height="100%">
                    <Text>In Gravity Bridge there are two fees you must pay in orde to bridge your assets from the Gravity Bridge chain to Ethereum.</Text>
                    <Text>A chain fee is 0.002% or 2 basis points in the denom of the total amount you are bridging. This fee is paid directly to the stakers of the graviton token.</Text>
                    <Text>A bridge fee is the fee you pay to have your tokens relayed between the two bridges. This fee covers the gas cost on the Eth side.</Text>
                    <Text>The data shown in this panel represents the total amount of chain fees and bridge fees paid by bridgers in their respective denoms.</Text>
                    </VStack>
                  </Stack>
        )}
      </Box>
    </Box>
  );
};

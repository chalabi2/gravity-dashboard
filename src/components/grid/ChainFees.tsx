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
  Wrap
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { getBridgeFeeTotals, getChainFeeTotals } from "../calculations/fees";
import { BridgeFeeData, ChainFeeData } from "../../types";
import { useMenu } from "@chakra-ui/react";
import { getCombinedFeeData } from "../calculations/oracle";
import { getAverageFees } from "../calculations/oracle";
import { getFees } from "../calculations/feeQuery"

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

function formatBtcNumber(number: number) {
  const formattedNumber = number / 10 ** 18;
  return formattedNumber.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ChainFee: React.FC<ChainFeeProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBg = useColorModeValue("white", "black");
  const modalBgText = useColorModeValue("black", "white");
  const [clickPosition, setClickPosition] = React.useState({
    x: 0,
    y: 0,
  });


  //Handle Fees
  type FeesData = {
    allTimeChainFees: { [key: string]: Number };
    allTimeBridgeFees: { [key: string]: Number };
    oneYearChainFees: { [key: string]: Number };
    oneYearBridgeFees: { [key: string]: Number };
    oneMonthChainFees: { [key: string]: Number };
    oneMonthBridgeFees: { [key: string]: Number };
    oneWeekChainFees: { [key: string]: Number };
    oneWeekBridgeFees: { [key: string]: Number };
    oneDayChainFees: { [key: string]: Number };
    oneDayBridgeFees: { [key: string]: Number };
  };

  const [feesData, setFeesData] = useState<FeesData | null>(null);

  useEffect(() => {
    getFees().then((result) => {
      if(result) {
        setFeesData(result);
      } else {
        setFeesData(null);
      }
    });
  }, []);

  //All Time
  const getAllTimeChainFees = (denom: string) => {
    if (!feesData) return 0;
    const fees = feesData.allTimeChainFees[denom];
    if (!fees) return 0;
  
    return (fees);
  };

  const getAllTimeBridgeFees = (denom: string) => {
    if (!feesData) return 0;
    const fees = feesData.allTimeBridgeFees[denom];
    if (!fees) return 0;
  
    return (fees);
  };  

  //1 year
  const getOneYearChainFees = (denom: string) => {
    if (!feesData) return 0;
    const fees = feesData.oneYearChainFees[denom];
    if (!fees) return 0;
  
    return (fees);
  };

  const getOneYearBridgeFees = (denom: string) => {
    if (!feesData) return 0;
    const fees = feesData.oneYearBridgeFees[denom];
    if (!fees) return 0;
  
    return (fees);
  };

    //1 month
    const getOneMonthChainFees = (denom: string) => {
      if (!feesData) return 0;

      const fees = feesData.oneMonthChainFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };
  
    const getOneMonthBridgeFees = (denom: string) => {
      if (!feesData) return 0;
    
      const fees = feesData.oneMonthBridgeFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };

    //1 week
    const getOneWeekChainFees = (denom: string) => {
      if (!feesData) return 0;
    
      const fees = feesData.oneWeekChainFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };
  
    const getOneWeekBridgeFees = (denom: string) => {
      if (!feesData) return 0;
    
      const fees = feesData.oneWeekBridgeFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };

    //1 day
    const getOneDayChainFees = (denom: string) => {
      if (!feesData) return 0;
    
      const fees = feesData.oneDayChainFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };
  
    const getOneDayBridgeFees = (denom: string) => {
      if (!feesData) return 0;
    
      const fees = feesData.oneDayBridgeFees[denom];
      if (!fees) return 0;
    
      return (fees);
    };

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

  const handleClickMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    onMenuOpen();
  };
  
  const [prices, setPrices] = useState({
    chainFeeTotalUSD: 0,
    bridgeFeeTotalUSD: 0,
    averageChainFee: 0,
    averageBridgeFee: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const feeData = await getCombinedFeeData();
      setPrices(feeData);
    };

    fetchData();
  }, []);

  const [feePrices, setFeePrices] = useState({
    averageChainFee: "0.00",
    averageBridgeFee: "0.00",
    mostCommonChainFeeDenom: "",
    mostCommonBridgeFeeDenom: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const feeData = await getAverageFees();
      setFeePrices(feeData);
    };

    fetchData();
  }, []);
  

  const handleClickInfo = (event: React.MouseEvent) => {
    // Store the click position
    setClickPosition({
      x: event.clientX,
      y: event.clientY,
    });
    onOpen();
    event.stopPropagation();
  };
  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const [selectedMenuItem, setSelectedMenuItem] = useState("Fees");


  return (
    <Box
      onMouseEnter={() => setShowInfoIcon(true)}
      onMouseLeave={() => {
        setShowInfoIcon(false);
        onClose();
        onMenuClose();
      }}
      position="relative"
    >
       <IconButton
         shadow={"dark-sm"}
      aria-label="Info"
      icon={<InfoIcon />}
      position="absolute"
      top={1}
      left={2}
      size="xs"
      variant="ghost"
      color="white"
      onClick={handleClickInfo}
      zIndex={1}
      style={{
        opacity: showInfoIcon ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out', 
      }}
    />
      <Menu>
        <MenuButton
          color="white"
          as={Button}
          boxShadow="none"
          rightIcon={<ChevronDownIcon boxSize="25px" />}
          aria-label="More"
          position="absolute"
          top={1}
          right={"240px"}
          size="md"
          variant="ghost"
          onClick={handleClickMenu}
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
        p={0} minW="0" w={'75px'}
          height="120px"
          bg="rgba(0, 0, 0, 0.8)"
          color="white"
        >
          <MenuItem
          fontFamily="Futura"
            onClick={() => setSelectedMenuItem("Fees")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Fees
          </MenuItem>
          <MenuItem
          fontFamily="Futura"
            onClick={() => setSelectedMenuItem("Totals")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Totals
          </MenuItem>
          <MenuItem
          fontFamily="Futura"
            onClick={() => setSelectedMenuItem("Tokens")}
            _hover={{
              textDecoration: "underline",
            }}
            bg="rgba(0, 18, 183, 0.0)"
          >
            Tokens
          </MenuItem>
        </MenuList>
      </Menu>
      <Box>
        {selectedMenuItem === "Fees" && (
          
          <Stack
            justify="center"
            justifyContent="space-between"
            align="center"
            spacing="0px"
            width="680px"
            height="sm"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura"
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
            <HStack
color="white"
  shadow={"dark-sm"}
fontFamily="Futura"
top={1}
right={2}
  p={1}
  borderRadius={4}
   position="absolute"
   spacing={4}
   bgColor="rgba(0, 18, 183, 0.1)"
>
  <Flex
   _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
  bgColor="rgba(0, 0, 0, 0.33)"
  borderRadius={"4px"}
  shadow={"dark-lg"}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>1D</Text>
  </Flex>
  <Flex
  _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
    shadow={"dark-lg"}
  bgColor="rgba(0, 0, 0, 0.3)"
  borderRadius={"4px"}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>7D</Text>
  </Flex>
  <Flex
  _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
    shadow={"dark-lg"}
  bgColor="rgba(0, 0, 0, 0.33)"
  borderRadius={"4px"}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>1M</Text>
  </Flex>
  <Flex
  _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
    shadow={"dark-lg"}
  bgColor="rgba(0, 0, 0, 0.33)"
  borderRadius={"4px"}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>All</Text>
  </Flex>
</HStack>
            <Flex pt={4} justifyContent="space-between" width="100%" height="100%">
              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={1}
                height="100%"
              >
                <Text
                  fontFamily="Futura"
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
                      USDC: {numberWithCommas(getAllTimeChainFees("USDC")).toString()}
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
                     WETH: {numberWithCommas(getAllTimeChainFees("WETH")).toString()}
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
                      wstETH: {numberWithCommas(getAllTimeChainFees("wstETH")).toString()}
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
                      USDT: {numberWithCommas(getAllTimeChainFees("USDT")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/7845/small/DV80FOp.png?1554953278"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      FUND: {numberWithCommas(getAllTimeChainFees("FUND")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/24488/small/NYM_Token.png?1649926353"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      NYM: {numberWithCommas(getAllTimeChainFees("NYM")).toString()}
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
                  fontFamily="Futura"
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
                      WETH: {numberWithCommas(getAllTimeBridgeFees("WETH")).toString()}
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
                      USDC: {numberWithCommas(getAllTimeBridgeFees("USDC")).toString()}
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
                      USDT: {numberWithCommas(getAllTimeBridgeFees("USDT")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      src="https://assets.coingecko.com/coins/images/24488/small/NYM_Token.png?1649926353"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      NYM: {numberWithCommas(getAllTimeBridgeFees("NYM")).toString()}
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
                     wstETH: {numberWithCommas(getAllTimeBridgeFees("wstETH")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/7845/small/DV80FOp.png?1554953278"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      FUND: {numberWithCommas(getAllTimeBridgeFees("FUND")).toString()}
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
            width="680px"
            height="sm"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura"
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
                  fontFamily="Futura"
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
            fontFamily="Futura"
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
  <Box as="span" position="relative" top="8px">~</Box>${numberWithCommas(prices.chainFeeTotalUSD.toFixed(0))}
</Text>
          <Text
            fontFamily="Futura"
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
      ${feePrices.averageChainFee}
    </Text>
          <Text
            fontFamily="Futura"
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
            {feePrices.mostCommonChainFeeDenom}
          </Text>
              </VStack>

              <VStack
                alignItems="center"
                spacing={2}
                flexGrow={1}
                height="100%"
              >
                <Text
                  fontFamily="Futura"
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
            fontFamily="Futura"
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
  <Box as="span" position="relative" top="8px">~</Box>${numberWithCommas(prices.bridgeFeeTotalUSD.toFixed(0))}
</Text>
          <Text
            fontFamily="Futura"
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
      ${feePrices.averageBridgeFee}
    </Text>
          <Text
            fontFamily="Futura"
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
         {feePrices.mostCommonBridgeFeeDenom}
          </Text>
              </VStack>
            </Flex>
          </Stack>
        )}
        {selectedMenuItem === "Tokens" && (
           <Stack
           justify="flex-start"
           justifyContent="space-between"
           align="center"
           spacing="0px"
           width="680px"
           height="sm"
           maxWidth="100%"
           bg="rgba(0, 18, 183, 0.5)"
           borderRadius="6px"
         >
           <Text
           pt={2}
             fontFamily="Futura"
             lineHeight="1.17"
             fontWeight="light"
             fontSize="24px"
             textTransform="capitalize"
             color="#FFFFFF"
             textAlign="center"
           >
Tokens             <Box
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
                 fontFamily="Futura"
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
        color="#FFFFFF"
        css={{
          '&::-webkit-scrollbar': {
            width: '1px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#f1f1f1',
          },
        }}
      >
        {chainFeesData.map((item) => (
          <Text
          fontFamily="Futura"
          key={item.denom}>
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
                 fontFamily="Futura"
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
        color="#FFFFFF"
        css={{
          '&::-webkit-scrollbar': {
            width: '1px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#f1f1f1',
          },
        }}
      >
        {bridgeFeesData.map((item) => (
          <Text
          fontFamily="Futura"
          key={item.denom}>
            {item.denom}: {item.totalBridgeFees}
          </Text>
        ))}
      </Box>
             </VStack>
           </Flex>
         </Stack>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
       
  <ModalContent
    top={isMobile ? 0 : clickPosition.y - 30}
    left={isMobile ? 0 : clickPosition.x - 175}
    position={isMobile ? "initial" : "fixed"}
    bgColor={modalBg}
    minH="200px" // Add minH property to set a minimum height
    maxH={isMobile ? "100vh" : "93%"}
    maxW="1000px"
  >
          <ModalHeader fontFamily="Futura">Fee Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="1000px" fontFamily="Futura" fontSize="20px">
          <VStack pt={4} width="100%" height="100%">
                      <Wrap
                      color={modalBgText}
                      >
                    <Text>In Gravity Bridge there are two fees you must pay in order to bridge your assets from the Gravity Bridge chain to Ethereum.</Text>
                    <Text>A chain fee is 0.002% or 2 basis points in the denom of the total amount you are bridging. This fee is paid directly to the stakers of the graviton token.</Text>
                    <Text>A bridge fee is the fee you pay to have your tokens relayed between the two bridges. This fee covers the gas cost on the Eth side.</Text>
                    <Text>The data shown in this panel represents the total amount of chain fees and bridge fees paid by bridgers in their respective denoms.</Text>
                    <Text>On the top right are the time based data selectors. 1D = One day, 7D = Seven Days, 1M = One Month, & All = Since block 491,111</Text>
                    </Wrap>
                    </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

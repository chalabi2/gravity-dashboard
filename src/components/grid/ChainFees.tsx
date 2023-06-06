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
  Wrap,
  Link
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { getBridgeFeeTotals, getChainFeeTotals } from "../calculations/fees";
import { BridgeFeeData, ChainFeeData } from "../../types";
import { getFees, getAverageFees, getCombinedFeeData, getMostValuableFees } from "../calculations/feeQuery";

interface ChainFeeProps {}

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


  // Fees Section
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

    const [timeFrame, setTimeFrame] = useState('allTime');

    const handleTimeFrameChange = (newTimeFrame: string) => {
      setTimeFrame(newTimeFrame);
    };

    let getChainFee;
switch (timeFrame) {
  case 'oneDay':
    getChainFee = getOneDayChainFees;
    break;
  case 'oneWeek':
    getChainFee = getOneWeekChainFees;
    break;
  case 'oneMonth':
    getChainFee = getOneMonthChainFees;
    break;
    case 'allTime':
      getChainFee = getAllTimeChainFees;
      break;
  default:
    getChainFee = getAllTimeChainFees;
}

let getBridgeFee;
switch (timeFrame) {
  case 'oneDay':
    getBridgeFee = getOneDayBridgeFees;
    break;
  case 'oneWeek':
    getBridgeFee = getOneWeekBridgeFees;
    break;
  case 'oneMonth':
    getBridgeFee = getOneMonthBridgeFees;
    break;
  case 'allTime':
      getBridgeFee = getAllTimeBridgeFees;
      break;
  default:
    getBridgeFee = getAllTimeChainFees;
}

  // Fee Totals Section
let timeFrameIndex;
switch (timeFrame) {
  case 'oneDay':
    timeFrameIndex = 0;
    break;
  case 'oneWeek':
    timeFrameIndex = 1;
    break;
  case 'oneMonth':
    timeFrameIndex = 2;
    break;
  case 'allTime':
    timeFrameIndex = 4;
    break;
  default:
    timeFrameIndex = 4;
}

type FeePrice = {
  averageChainFee: string;
  averageBridgeFee: string;
  mostCommonChainFeeDenom: string;
  mostCommonBridgeFeeDenom: string;
}

type FeeMax = {
  maxChainFee: string;
  maxBridgeFee: string;
  maxChainFeeDenom: string;
  maxBridgeFeeDenom: string;
  txHashRecordBridge: string;
  txHashRecordChain: string;
}

const [feePrices, setFeePrices] = useState<FeePrice[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const feeData = await getAverageFees();
    setFeePrices(Array.isArray(feeData) ? feeData : [feeData]);
  };

  fetchData();
}, []);

let getAverageChainFee;
if (feePrices.length > timeFrameIndex) {
  getAverageChainFee = feePrices[timeFrameIndex].averageChainFee;
}

let getAverageBridgeFee;
if (feePrices.length > timeFrameIndex) {
  getAverageBridgeFee = feePrices[timeFrameIndex].averageBridgeFee;
}

let mostCommonChainFeeDenom;
if (feePrices.length > timeFrameIndex) {
  mostCommonChainFeeDenom = feePrices[timeFrameIndex].mostCommonChainFeeDenom;
}

let mostCommonBridgeFeeDenom;
if (feePrices.length > timeFrameIndex) {
  mostCommonBridgeFeeDenom = feePrices[timeFrameIndex].mostCommonBridgeFeeDenom;
}

const [feeMax, setFeeMax] = useState<FeeMax[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const feeDataMax = await getMostValuableFees();
    setFeeMax(Array.isArray(feeDataMax) ? feeDataMax : [feeDataMax]);
  };

  fetchData();
}, []);

let getHighestChainFee = "0";
let getHighestBridgeFee = "0";
let getHighestChainFeeDenom = "";
let getHighestBridgeFeeDenom = "";
let txHashRecordChain = "";
let txHashRecordBridge = "";

if (feeMax.length > timeFrameIndex) {
  getHighestChainFee = feeMax[timeFrameIndex].maxChainFee;
  getHighestBridgeFee = feeMax[timeFrameIndex].maxBridgeFee;
  getHighestChainFeeDenom = feeMax[timeFrameIndex].maxChainFeeDenom;
  getHighestBridgeFeeDenom = feeMax[timeFrameIndex].maxBridgeFeeDenom;
  txHashRecordBridge = feeMax[timeFrameIndex].txHashRecordBridge;
  txHashRecordChain = feeMax[timeFrameIndex].txHashRecordChain;
}

type TotalFee = {
  totalChainFeeUSD: Number,
  totalBridgeFeeUSD: Number,
}

const [totalFees, setTotalFees] = useState<TotalFee[]>([]);

let getBridgeFeeTotal;
if (feePrices.length > timeFrameIndex ?? 4) {
  getBridgeFeeTotal = totalFees[timeFrameIndex]?.totalBridgeFeeUSD;
}

let getChainFeeTotal;
if (feePrices.length > timeFrameIndex ?? 4) {
  getChainFeeTotal = totalFees[timeFrameIndex]?.totalChainFeeUSD;
}

useEffect(() => {
  const fetchData = async () => {
    const feeData = await getCombinedFeeData();
    setTotalFees(Array.isArray(feeData) ? feeData : [feeData]);
  };

  fetchData();
}, []);

//Token list section
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

  const handleClickMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    onMenuOpen();
  };
  
  const handleClickInfo = (event: React.MouseEvent) => {
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

  const txLinkChainFee = `https://www.mintscan.io/gravity-bridge/txs/${txHashRecordChain}`
  const txLinkBridgeFee = `https://www.mintscan.io/gravity-bridge/txs/${txHashRecordBridge}`

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
            height="482px"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura"
              lineHeight="1"
              fontWeight="Bold"
              fontSize="28px"
              textTransform="capitalize"
              color="#FFFFFF"
              textAlign="center"
            >
              Fees
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
   bgColor={timeFrame === 'oneDay' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  shadow={"dark-lg"}
  onClick={() => handleTimeFrameChange('oneDay')}
  >
<Text
fontSize="sm"
fontFamily="Futura"
p={0.5}
_hover={{ cursor: "pointer" }}
>1D</Text>
  </Flex>
  <Flex
  _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
    shadow={"dark-lg"}
    bgColor={timeFrame === 'oneWeek' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('oneWeek')}
  >
<Text
fontSize="sm"
p={0.5}
fontFamily="Futura"
_hover={{ cursor: "pointer" }}
>7D</Text>
  </Flex>
  <Flex
  _hover={{ textDecoration: "none", bgColor: "rgba(0, 18, 183, 0.1)" }}
    shadow={"dark-lg"}
    bgColor={timeFrame === 'oneMonth' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('oneMonth')}
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
    bgColor={timeFrame === 'allTime' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('allTime')}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>All</Text>
  </Flex>
</HStack>
<Flex pt={4} justifyContent="space-between" width="100%" height="100%" alignItems="center">
<VStack
  alignItems="center"
  spacing={2}
  flexGrow={1}
  height="100%"

>
                <Text
                  fontFamily="Futura"
                  fontWeight="light"
                  fontSize="24px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Chain Fees:
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
                      USDC: {numberWithCommas(getChainFee("USDC")).toString()}
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
                     WETH: {numberWithCommas(getChainFee("WETH")).toString()}
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
                      wstETH: {numberWithCommas(getChainFee("wstETH")).toString()}
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
                      USDT: {numberWithCommas(getChainFee("USDT")).toString()}
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
                      FUND: {numberWithCommas(getChainFee("FUND")).toString()}
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
                      NYM: {numberWithCommas(getChainFee("NYM")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/23308/small/somm_new.png?1650884424"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      SOMM: {numberWithCommas(getChainFee("SOMM")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/25181/small/thumbnail.png?1658821784"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      MNTL: {numberWithCommas(getChainFee("MNTL")).toString()}
                    </Text>
                  </HStack>
                </VStack>
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
                  fontSize="24px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Eth Gas Fees:
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
                      WETH: {numberWithCommas(getBridgeFee("WETH")).toString()}
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
                      USDC: {numberWithCommas(getBridgeFee("USDC")).toString()}
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
                      USDT: {numberWithCommas(getBridgeFee("USDT")).toString()}
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
                      NYM: {numberWithCommas(getBridgeFee("NYM")).toString()}
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
                     wstETH: {numberWithCommas(getBridgeFee("wstETH")).toString()}
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
                      FUND: {numberWithCommas(getBridgeFee("FUND")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/23308/small/somm_new.png?1650884424"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      SOMM: {numberWithCommas(getBridgeFee("SOMM")).toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Image
                      boxSize="25px"
                      borderRadius={"full"}
                      src="https://assets.coingecko.com/coins/images/25181/small/thumbnail.png?1658821784"
                    />
                    <Text
                      fontFamily="futura"
                      fontWeight="light"
                      fontSize="20px"
                      textTransform="capitalize"
                      color="#FFFFFF"
                    >
                      MNTL: {numberWithCommas(getBridgeFee("MNTL")).toString()}
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
            height="482px"
            maxWidth="100%"
            bg="rgba(0, 18, 183, 0.5)"
            borderRadius="6px"
          >
            <Text
            pt={2}
              fontFamily="Futura"
              lineHeight="1"
              fontWeight="bold"
              fontSize="28px"
              textTransform="capitalize"
              color="#FFFFFF"
              textAlign="center"
            >
              Fee Totals
  
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
   bgColor={timeFrame === 'oneDay' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  shadow={"dark-lg"}
  onClick={() => handleTimeFrameChange('oneDay')}
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
    bgColor={timeFrame === 'oneWeek' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('oneWeek')}
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
    bgColor={timeFrame === 'oneMonth' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('oneMonth')}
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
    bgColor={timeFrame === 'allTime' ? "rgba(0, 18, 183, 0.1)" : "rgba(100, 100, 0, 0.5)"}
  borderRadius={"4px"}
  onClick={() => handleTimeFrameChange('allTime')}
  >
<Text
fontSize="sm"
p={0.5}
_hover={{ cursor: "pointer" }}
>All</Text>
  </Flex>
</HStack>
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
                  fontSize="24px"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Chain Fees:
          
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
  <Box as="span" position="relative" top="8px">~</Box>${numberWithCommas(getChainFeeTotal?.toFixed(0) ?? 0)}
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
      ${getAverageChainFee}
    </Text>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Most Used Fee

          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
            pb={4}
          >
            {mostCommonChainFeeDenom}
          </Text>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Highest Fee

          </Text>
          <HStack
          spacing="1"
          >
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            ${getHighestChainFee}
          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            in {getHighestChainFeeDenom}
          </Text>
          
          </HStack>
          <Link
          href={txLinkChainFee}
          target="_blank"
          >
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Tx Link
          </Text>
          </Link>
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
                  fontSize="24"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Eth Gas Fees:
        
                </Text>
                <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Total Eth Gas Fees

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
  <Box as="span" position="relative" top="8px">~</Box>${numberWithCommas(getBridgeFeeTotal?.toFixed(0) ?? 0)}
</Text>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Average Eth Gas Fee

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
      ${getAverageBridgeFee}
    </Text>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Most Used Fee

          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
            pb={4}
          >
         {mostCommonBridgeFeeDenom}
          </Text>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
           Highest Fee

          </Text>
          <HStack
          spacing="1"
          >
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            ${getHighestBridgeFee}
          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            in {getHighestBridgeFeeDenom}
          </Text>
          </HStack>
          <Link
          href={txLinkBridgeFee}
          target="_blank"
          >
          <Text
            fontFamily="futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Tx Link
          </Text>
          </Link>
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
           height="482px"
           maxWidth="100%"
           bg="rgba(0, 18, 183, 0.5)"
           borderRadius="6px"
         >
           <Text
           pt={2}
             fontFamily="Futura"
             lineHeight="1"
             fontWeight="bold"
             fontSize="28px"
             textTransform="capitalize"
             color="#FFFFFF"
             textAlign="center"
           >
Tokens             
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
                 fontSize="24"
                 textTransform="capitalize"
                 color="#FFFFFF"
               >
                 Chain Fees:
                
               </Text>
               <Box
        width="75%"
        height="365px"
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
                 fontSize="24px"
                 textTransform="capitalize"
                 color="#FFFFFF"
               >
                 Eth Gas Fees:
              
               </Text>
               <Box
        width="75%"
        height="365px"
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
                    <Text>An Eth gas fee is the fee you pay to have your tokens relayed between the two bridges. This fee covers the gas cost on the Eth side.</Text>
                    <Text>The data shown in this panel represents the total amount of chain fees and eth gas fees paid by bridgers in their respective denoms.</Text>
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

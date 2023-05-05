import { Box, Flex, Stack, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  useMediaQuery } from "@chakra-ui/react";
  import { InfoIcon } from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import { getChainFees } from "../calculations/fees";
import { ChainFeeData } from "../../types";

interface ChainFeeProps {}

function formatCosmosNumber(number: number) {
  const formattedNumber = Math.floor(number / 1000000);
  return formattedNumber.toLocaleString('en-US');
}

function formatEthNumber(number: number) {
  const formattedNumber = number / (10 ** 18);
  return formattedNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const ChainFee: React.FC<ChainFeeProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBgText = useColorModeValue("white", "black");
  const [clickPosition, setClickPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const [chainFeesData, setChainFeesData] = useState<ChainFeeData[]>([]);

  useEffect(() => {
    getChainFees().then((result) => {
      setChainFeesData(result);
    });
  }, []);
  
  const getTotalChainFees = (denom: string) => {
    const entry = chainFeesData.find((item) => item.denom === denom);
    return entry ? entry.totalChainFees : 0;
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

  return (
    <Box 
    onMouseEnter={() => setShowInfoIcon(true)}
    onMouseLeave={() => {
      if (!isOpen) {
        setShowInfoIcon(false); // Hide icon when not hovered and modal is not open
      }
    }}
    position="relative">
      <IconButton
        aria-label="Info"
        icon={<InfoIcon />}
        position="absolute"
        top={1}
        left={5}
        size="xs"
        variant="ghost"
        color="white"
        onClick={handleClick}
        zIndex={1}
        style={{
          opacity: showInfoIcon ? 1 : 0, // Set opacity based on showInfoIcon state
          transition: 'opacity 0.3s ease-in-out', // Gradual opacity transition
        }}
      />
  <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "100%" }}>
    <Stack
      justify="flex-start"
      align="center"
      spacing="0px"
      width="330px"
      height="120px"
      maxWidth="100%"
      bg="rgba(0, 18, 183, 0.5)"
      borderRadius="6px"
      p="14px"
      ml="15px"
    >
      <Text
        fontFamily="Futura MD BT"
        lineHeight="1.56"
        fontWeight="light"
        fontSize="24px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Total Chain Fees Paid
        <Box
    width="100%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="2px"
  />
      </Text>
      <Flex justify="center" align="center">
        <Stack direction="row" justify="flex-start" align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="26px"
            color="#FFFFFF"
          >
            {formatCosmosNumber(getTotalChainFees("USDC"))}
          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.43"
            fontWeight="light"
            fontSize="14px"
            letterSpacing="0.32px"
            color="#FFFFFF"
            paddingRight="8px"
          >
            USDC
          </Text>
        </Stack>
        <Stack direction="row" justify="flex-start" align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="26px"
            color="#FFFFFF"
          >
            150k
          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.43"
            fontWeight="light"
            fontSize="14px"
            letterSpacing="0.32px"
            color="#FFFFFF"
            paddingRight="8px"
          >
            Graviton
          </Text>
        </Stack>
        <Stack direction="row" justify="flex-start" align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="26px"
            color="#FFFFFF"
          >
            {formatEthNumber(getTotalChainFees("WETH"))}
          </Text>
          <Text
            fontFamily="futura"
            lineHeight="1.43"
            fontWeight="light"
            fontSize="14px"
            letterSpacing="0.32px"
            color="#FFFFFF"
          >
            ETH
          </Text>
        </Stack>
      </Flex>
    </Stack>
  </Box>
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined} >
          <ModalHeader fontFamily="Futura">Chain Fees</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px">
            This grid item shows the total amount of Chain Fees paid to stakers of graviton. Chain Fees are paid by bridgers in addition to the bridge fee. 
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Box>
);
};
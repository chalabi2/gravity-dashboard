import { IconButton, Box, Stack, Text, Flex, HStack, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useMediaQuery } from '@chakra-ui/react';
import BridgeVolumeChart from '../charts/BridgeVolumeChart';
import { BridgeVolumeChartData } from '../calculations/BridgeVolume';
import { useVolumeInfo } from '../calculations/GravityChainApi';
import { InfoIcon } from "@chakra-ui/icons";
import React, {useState} from 'react';

import getDuneData from '../calculations/DuneApi';


export const BridgeVolume = () => {
  const volumeInfo = useVolumeInfo();
  const monthlyVolume = volumeInfo?.weekly_volume || 0;
  const dailyVolume = volumeInfo?.daily_volume || 0;
  const monthly_volume = volumeInfo?.monthly_volume || 0;
  
  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return `$${(number / 1e9).toFixed(1)}B`;
    } else if (number >= 1e6) {
      return `$${(number / 1e6).toFixed(1)}M`;
    } else if (number >= 1e3) {
      return `$${(number / 1e3).toFixed(1)}K`;
    } else {
      return `$${number.toFixed(1)}`;
    }
  };

  const duneData = getDuneData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalBgText = useColorModeValue("white", "black");
  const [clickPosition, setClickPosition] = React.useState({
    x: 0,
    y: 0,
  });

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
      left={2}
      size="xs"
      variant="ghost"
      color="white"
      onClick={handleClick}
      zIndex={1}
      style={{
        opacity: showInfoIcon ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out', 
      }}
      />
      <Stack
        paddingY="24px"
        borderRadius="6px"
        justify="flex-start"
        align="flex-start"
        p={{ base: "14px", md: "25px" }}
        spacing="24px"
        width="330px"
        maxWidth="100%"
        height="sm"
        background="rgba(0, 18, 183, 0.5)"
      >
    <Stack paddingX="40px" justify="center" align="flex-start" alignSelf="stretch">
      <Flex justify="space-between" align="center" alignSelf="stretch">
        <Text
          fontFamily="Futura"
          lineHeight="1.17"
          fontWeight="light"
          fontSize="24px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Bridge Volume
          <Box
    width="100%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="-1px"
  />
        </Text>
      </Flex>
      <HStack>
      <Flex justify="space-between" align="center" alignSelf="stretch">
        <Flex align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="32px"
            color="#FFFFFF"
          >
            $1.14B
          </Text>
        </Flex>
        <BridgeVolumeChart data={BridgeVolumeChartData}/>
      </Flex>
      </HStack>
    </Stack>
    <Stack
      paddingX="40px"
      justify="flex-end"
      align="flex-start"
      spacing="16px"
      alignSelf="stretch"
    >
      {['Daily:', 'Weekly:'].map((label, index) => (
        <Flex
          key={index}
          justify="space-between"
          align="center"
          alignSelf="stretch"
        >
          <Text
            fontFamily="Futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            {label}
          </Text>
          <Flex ml="25px" align="center">
            <Flex align="baseline">
              <Text
                fontFamily="futura"
                fontWeight="light"
                fontSize="20px"
                textTransform="capitalize"
                color="#FFFFFF"
              >
                {index === 0 ? formatNumber(dailyVolume) : formatNumber(monthlyVolume)}
              </Text>
            </Flex>
            <Flex
              paddingX="12px"
              paddingY="2px"
              borderRadius="64px"
              ml="5px"
              align="center"
              background={index === 0 ? '#32CD32' : '#FF4500'}
            >
               <Text
                fontFamily="futura"
                lineHeight="1"
                fontWeight="light"
                fontSize="20px"
                letterSpacing="0.32px"
                color="white"
              >
                {index === 0 ? '30%' : '15%'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
      <Flex pt={4} justify="space-between" align="center" alignSelf="stretch">
        <Text
          fontFamily="Futura"
          lineHeight="1.17"
          fontWeight="light"
          fontSize="24px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          TVL
          <Box
    width="100%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="-1px"
  />
        </Text>
      </Flex>
      <HStack>
      <Flex justify="space-between" align="center" alignSelf="stretch">
        <Flex align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="32px"
            color="#FFFFFF"
          >
            $92.17M
          </Text>
        </Flex>
      </Flex>
      </HStack>
    </Stack>
    </Stack>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined} >
          <ModalHeader fontFamily="Futura">Volume Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px">
            This grid item shows the the total volume transfered between Gravity Bridge & Ethereum including the daily and weekly total amounts.
            TVL is the total value locked in the Gravity Bridge contracts.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
};
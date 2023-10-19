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
import React, {useEffect, useState} from 'react';
import { getBridgeTvl } from '../calculations/chandraApi';
import { DuneData } from '../../types'

export const BridgeVolume = () => {
  const { today: volumeInfo, yesterday: yesterdayVolumeInfo, dayBeforeYesterday: dayBeforeYesterdayVolumeInfo } = useVolumeInfo();
  const dailyVolume = volumeInfo?.daily_volume || 0;
  const weeklyVolume = volumeInfo?.weekly_volume || 0;
  const yesterdayDailyVolume = yesterdayVolumeInfo?.daily_volume || dayBeforeYesterdayVolumeInfo?.daily_volume || 0;
  const yesterdayWeeklyVolume = yesterdayVolumeInfo?.weekly_volume || dayBeforeYesterdayVolumeInfo?.weekly_volume || 0;

  const dailyVolumeChange = yesterdayDailyVolume !== 0 ? ((dailyVolume - yesterdayDailyVolume) / yesterdayDailyVolume) * 100 : 0;
  const weeklyVolumeChange = yesterdayWeeklyVolume !== 0 ? ((weeklyVolume - yesterdayWeeklyVolume) / yesterdayWeeklyVolume) * 100 : 0;

  const [dailyColor, setDailyColor] = useState('#32CD32');
  const [weeklyColor, setWeeklyColor] = useState('#32CD32');

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalBgText = useColorModeValue("white", "black");
  const [clickPosition, setClickPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const handleClick = (event: React.MouseEvent) => {
    setClickPosition({
      x: event.clientX,
      y: event.clientY,
    });
    onOpen();
  };

  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  const [bridgeInfo, setBridgeInfo] = useState<DuneData>();

  useEffect(() => {
    getBridgeTvl().then((data) => {
      setBridgeInfo(data);
    });
  }, []);

  const [dailyPercentageChange, setDailyPercentageChange] = useState(0);
  const [weeklyPercentageChange, setWeeklyPercentageChange] = useState(0);

  useEffect(() => {
    setDailyPercentageChange(dailyVolumeChange);
    setWeeklyPercentageChange(weeklyVolumeChange);
  }, [dailyVolumeChange, weeklyVolumeChange]);

  useEffect(() => {
    setDailyPercentageChange(dailyVolumeChange);
    if (dailyVolumeChange > 0) {
      setDailyColor('#32CD32');  // green for increase
    } else if (dailyVolumeChange < 0) {
      setDailyColor('#FF4500');  // red for decrease
    } else {
      setDailyColor('rgba(169,169,169,0.6)');  // grey for no change
    }
  }, [dailyVolumeChange]);
  
  useEffect(() => {
    setWeeklyPercentageChange(weeklyVolumeChange);
    if (weeklyVolumeChange > 0) {
      setWeeklyColor('#32CD32');  // green for increase
    } else if (weeklyVolumeChange < 0) {
      setWeeklyColor('#FF4500');  // red for decrease
    } else {
      setWeeklyColor('rgba(169,169,169,0.6)');  // grey for no change
    }
  }, [weeklyVolumeChange]);

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
        p={{ base: "20px", md: "20px" }}
        pl={{ base: "5px", md: "5px" }}
        spacing="24px"
        width="335px"
        maxWidth="100%"
        height="sm"
        background="rgba(0, 18, 183, 0.5)"
      >
    <Stack paddingX="40px" justify="center" align="flex-start" alignSelf="stretch">
      <Flex justify="space-between" align="center" alignSelf="stretch">
        <Text
          fontFamily="Futura"
          lineHeight="1"
          fontWeight="light"
          fontSize="28px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Bridge Volume
          
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
           $1.23B
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
              {index === 0 ? formatNumber(dailyVolume) : formatNumber(weeklyVolume)}
              </Text>
            </Flex>
            {dailyVolumeChange > 0 && (
  <Flex
    paddingX="12px"
    paddingY="2px"
    borderRadius="64px"
    ml="5px"
    align="center"
    background={index === 0 ? dailyColor : weeklyColor}
  >
    <Text
      fontFamily="futura"
      lineHeight="1"
      fontWeight="light"
      fontSize="20px"
      letterSpacing="0.32px"
      color="white"
    >
      {index === 0 ? `${dailyPercentageChange}%` : `${weeklyPercentageChange}%`}
    </Text>
  </Flex>
)}
          </Flex>
        </Flex>
      ))}
      <Flex pt={{base: 0, md: 4}} justify="space-between" align="center" alignSelf="stretch">
        <Text
          fontFamily="Futura"
          lineHeight="1.17"
          fontWeight="light"
          fontSize="28px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          TVL
        
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
            $46.46M
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
            TVL is the total value locked in the Gravity Bridge contracts. The percentages next to the volume amounts show the change in volume from the previous day or week.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
};
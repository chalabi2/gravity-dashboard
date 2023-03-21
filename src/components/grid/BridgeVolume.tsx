import { Box, Stack, Text, Flex, HStack } from '@chakra-ui/react';
import BridgeVolumeChart from '../charts/BridgeVolumeChart';
import { BridgeVolumeChartData } from '../calculations/BridgeVolume';
import { useVolumeInfo } from '../calculations/ApiCalls';

export const BridgeVolume = () => {
  const volumeInfo = useVolumeInfo();
  const monthlyVolume = volumeInfo?.weekly_volume || 0;
  const dailyVolume = volumeInfo?.daily_volume || 0;
  
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

  return (
  <Stack
    paddingY="24px"
    borderRadius="6px"
    justify="flex-start"
    align="flex-start"
    p={{ base: '14px', md: '25px' }}
    spacing="24px"
    width="330px"
    maxWidth="100%"
    background="rgba(0, 18, 183, 0.5)"
  >
    <Stack paddingX="40px" justify="center" align="flex-start" alignSelf="stretch">
      <Flex justify="space-between" align="center" alignSelf="stretch">
        <Text
          fontFamily="Futura MD BT"
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
    bgColor="#FFFFFF"
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
            $800m
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
            fontFamily="Futura MD BT"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            {label}
          </Text>
          <Flex align="center">
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
              background={index === 0 ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'}
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
    </Stack>
  </Stack>
  )
};
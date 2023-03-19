import { Stack, Text, Box, Flex } from '@chakra-ui/react';

export const BridgeVolume = () => (
  <Stack
    paddingY="24px"
    borderRadius="6px"
    justify="flex-start"
    align="flex-start"
    p={{ base: '14px', md: '25px' }}
    spacing="24px"
    width="330px"
    maxWidth="100%"
    background="rgba(0, 18, 183, 0.35)"
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
        </Text>
      </Flex>
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
        <Box width="160px" height="80px" background="url('/path/to/chart/image')" />
      </Flex>
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
                {index === 0 ? '$2m' : '$20m'}
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
                color={index === 0 ? 'Teal.50' : 'Red.50'}
              >
                {index === 0 ? '30%' : '15%'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Stack>
  </Stack>
);
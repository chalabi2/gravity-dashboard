import { Box, Flex, Stack, Text } from '@chakra-ui/react';

interface ChainFeeProps {}

export const ChainFee: React.FC<ChainFeeProps> = () => (
  <Box  mb={{ base: '10px', md: 0 }} width={{ base: '100%', md: '100%' }}>
    <Stack
      justify="flex-start"
      align="center"
      spacing="0px"
      width="330px"
      height="120px"
      maxWidth="100%"
      bg="rgba(0, 18, 183, 0.35)"
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
      </Text>
      <Flex justify="center" align="center" >
        <Stack direction="row" justify="flex-start" align="baseline">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="26px"
            color="#FFFFFF"
          >
            15k
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
            32
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
      <Text
        fontFamily="Futura MD BT"
        lineHeight="2.8"
        fontWeight="light"
        fontSize="11px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Chain Fees generated and paid to stakers
      </Text>
    </Stack>
  </Box>
);

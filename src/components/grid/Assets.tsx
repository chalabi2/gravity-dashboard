import React from 'react';
import { Stack, Text, Box } from '@chakra-ui/react';

export const Assets: React.FC = () => (
    <Stack
      padding="10px"
      p={{ base: '14px', md: '25px' }}
      direction="column"
      spacing="10px"
      background="rgba(0, 18, 183, 0.35)"
      borderRadius="8px"
      width="340px"
      height="400px"
      maxWidth="100%"
    >
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="24px"
        color="#FFFFFF"
        textAlign="center"
      >
        Ibc & Eth Assets
      </Text>
      <Stack direction="row" spacing="15px">
        <Stack>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Monthly In
          </Text>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="18px"
            color="#FFFFFF"
          >
            $12,652,193
          </Text>
        </Stack>
        <Stack>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Monthly Out
          </Text>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="18px"
            color="#FFFFFF"
          >
            $6,111,235
          </Text>
        </Stack>
      </Stack>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Biggest Movers
      </Text>
      <Stack direction="row" spacing="96px">
        <Stack>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $65,000
          </Text>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Daily In
          </Text>
        </Stack>
        <Stack alignItems="flex-end">
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            $12,248
          </Text>
          <Text
            fontFamily="futura"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Daily Out
          </Text>
        </Stack>
      </Stack>
      <Box
        borderRadius="1px"
        width="100%"
        height="4px"
        background="linear-gradient(270deg, #ff0000 0%, #00ff38 100%)"
      />
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        color="#FFFFFF"
      >
        $65K
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      1. USDC 2. ETH 3. CANTO
    </Text>
    <Text
      fontFamily="futura"
      fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      4. ATOM 5. DAI 6. WETH
    </Text>
  </Stack>
);
import { Box, Flex, Text } from '@chakra-ui/react';

export const Pmtr = () => (
  <Box
    p={{ base: '14px', md: '25px' }}
    borderRadius="6px"
    maxWidth="736px"
    width="100%"
    bg="rgba(0, 18, 183, 0.35)"
  >
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="flex-start"
      wrap="wrap"
    >
      <Box mb={{ base: '10px', md: 0 }}>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Price
        </Text>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          $0.012
        </Text>
      </Box>
      <Box mb={{ base: '10px', md: 0 }}>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Market Cap
        </Text>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          $32,002,514
        </Text>
      </Box>
      <Box mb={{ base: '10px', md: 0 }}>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Trading Volume
        </Text>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          $625,000
        </Text>
      </Box>
      <Box>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          Rank
        </Text>
        <Text
          fontFamily="futura"
          lineHeight="1.4"
          fontWeight="light"
          fontSize="20px"
          textTransform="capitalize"
          color="#FFFFFF"
        >
          315
        </Text>
      </Box>
    </Flex>
  </Box>
);
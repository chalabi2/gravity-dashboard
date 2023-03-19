import { Box, Flex, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchGravityBridgeData } from '../calculations/Pmtr';

type GravityBridgeData = {
  price: number;
  marketCap: string;
  tradingVolume: string;
  rank: number;
};

export const Pmtr = () => {
  const [data, setData] = useState<GravityBridgeData>({
    price: 0,
    marketCap: '0',
    tradingVolume: '0',
    rank: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchGravityBridgeData();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <Box
      p={{ base: '14px', md: '25px' }}
      borderRadius="6px"
      maxWidth="736px"
      width="99.3%"
      marginLeft="5px"
      bg="rgba(0, 18, 183, 0.35)"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'center', md: 'flex-start' }}
        wrap="wrap"
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Box mb={{ base: '10px', md: 0 }} width={{ base: '100%', md: 'auto' }}>
          <Text
            fontFamily="Futura MD BT"
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
            ${data.price.toFixed(3)}
          </Text>
        </Box>
        <Box
          mb={{ base: '10px', md: 0 }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Text
            fontFamily="Futura MD BT"
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
            ${data.marketCap}
          </Text>
        </Box>
        <Box
          mb={{ base: '10px', md: 0 }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Text
            fontFamily="Futura MD BT"
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
            ${data.tradingVolume}
          </Text>
        </Box>
        <Box width={{ base: '100%', md: 'auto' }}>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="  light"
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
            {data.rank}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
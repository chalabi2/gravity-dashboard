import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchGravityBridgeData } from "../calculations/Pmtr";

type GravityBridgeData = {
  price: number;
  marketCap: string;
  tradingVolume: string;
  rank: number;
};

export const Pmtr = () => {
  const [data, setData] = useState<GravityBridgeData>({
    price: 0,
    marketCap: "0",
    tradingVolume: "0",
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
      p={{ base: "14px", md: "25px" }}
      borderRadius="6px"
      maxWidth="682px"
      width="99.3%"
      marginLeft="6px"
      bg="rgba(0, 18, 183, 0.5)"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "center", md: "flex-start" }}
        wrap="wrap"
        textAlign={{ base: "center", md: "left" }}
      >
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Price
            <Box
    width={{md: "85%", base: "15%"}}
    ml={{md: "0", base: "128px"}}
    height="1px"
    bgColor="#FFFFFF"
    position={{md: "relative", base: "sticky"}}

    bottom="1px"
  />
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
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Market Cap
            <Box
    width={{md: "100%", base: "33%"}}
    ml={{md: "0", base: "102px"}}
    height="1px"
    bgColor="#FFFFFF"
    position={{md: "relative", base: "sticky"}}

    bottom="1px"
  />
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
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Trading Volume
            <Box
    width={{md: "100%", base: "43%"}}
    ml={{md: "0", base: "88px"}}
    height="1px"
    bgColor="#FFFFFF"
    position={{md: "relative", base: "sticky"}}

    bottom="1px"
  />
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
        <Box width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura MD BT"
            lineHeight="1.4"
            fontWeight="  light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Rank
            <Box
    width={{md: "100%", base: "16%"}}
    ml={{md: "0", base: "125px"}}
    height="1px"
    bgColor="#FFFFFF"
    position={{md: "relative", base: "sticky"}}

    bottom="1px"
  />
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

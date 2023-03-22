import {
  Box,
  Flex,
  Text,
  IconButton,
  Modal,
  useColorModeValue,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { fetchGravityBridgeData } from "../calculations/Pmtr";
import { GravityBridgeData } from "../../types";
import React from "react";


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
      p={{ base: "14px", md: "25px" }}
      borderRadius="6px"
      maxWidth="682px"
      width="99.3%"
      marginLeft="6px"
      bg="rgba(0, 18, 183, 0.5)"
    >
      <Box 
      ml={{md: "-28px", base: "-18px"}} position="relative" width="100%" height="100%" >
       <IconButton
        aria-label="Info"
        icon={<InfoIcon />}
        position="absolute"
        top={2}
        left={2}
        size="xs"
        variant="ghost"
        color="white"
        onClick={handleClick}
        zIndex={1}
        mt={{md: "-30px", base: "-20px"}}
        style={{
          opacity: showInfoIcon ? 1 : 0, // Set opacity based on showInfoIcon state
          transition: 'opacity 0.3s ease-in-out', // Gradual opacity transition
        }}
      />
      </Box>
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
    bgColor="rgb(255,255,255, 0.5)"
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
    bgColor="rgb(255,255,255, 0.5)"
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
    bgColor="rgb(255,255,255, 0.5)"
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
    bgColor="rgb(255,255,255, 0.5)"
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined}>
          <ModalHeader>Price Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px">
            This grid item shows the price, market cap, trading volume, and rank of graviton token.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

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
  useMediaQuery,
  SkeletonText
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
  
    const intervalId = setInterval(fetchData, 3 * 60 * 60 * 1000); // Refresh data every 3 hours
  
    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);
  const [isLoading, setIsLoading] = useState(false);
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
      maxH="90px"
      maxWidth="680"
      width="680px"
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
      mt="-8px"
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "center", md: "flex-start" }}
        wrap="wrap"
        textAlign={{ base: "center", md: "left" }}
      >
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura"
            lineHeight="1.4"
            fontWeight="light"
            fontSize="20px"
            textTransform="capitalize"
            color="#FFFFFF"
          >
            Price
      
          </Text>
          <SkeletonText
                  isLoaded={!isLoading}
          noOfLines={1}
          skeletonHeight="5"
          >
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
          </SkeletonText>
        </Box>
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura"
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
        <Box mb={{ base: "10px", md: 0 }} width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura"
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
        <Box width={{ base: "100%", md: "auto" }}>
          <Text
            fontFamily="Futura"
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined}>
          <ModalHeader
          fontFamily="Futura"
          >Price Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px">
            This grid item shows the price, market cap, trading volume, and rank of the Graviton token according to CoinGecko.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

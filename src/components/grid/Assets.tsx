import React, {useState} from 'react';
import { Grid, Text, Box, Flex, ListItem, UnorderedList, HStack, IconButton, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useMediaQuery } from '@chakra-ui/react';
import { biggestMover1, biggestMover2, biggestMover3, biggestMover4, biggestMover5, biggestMover6 } from '../calculations/Assets';
import { useVolumeInfo } from '../calculations/GravityChainApi';
import { InfoIcon } from "@chakra-ui/icons";


export const Assets: React.FC = () => {
  const volumeInfo = useVolumeInfo();
  const dailyIn = Math.round(volumeInfo?.daily_inflow || 0);
  const dailyOut = Math.round(volumeInfo?.daily_outflow || 0);
  const monthlyIn = Math.round(volumeInfo?.monthly_inflow || 0);
  const monthlyOut = Math.round(volumeInfo?.monthly_outflow || 0);

  const percentageDifference = (monthlyOut / (monthlyIn + monthlyOut)) * 100;
  const percentageDifferenceDaily = (dailyOut / (dailyIn + dailyOut)) * 100;
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
        opacity: showInfoIcon ? 1 : 0, // Set opacity based on showInfoIcon state
        transition: 'opacity 0.3s ease-in-out', // Gradual opacity transition
      }}
    />
  <Grid
    padding="10px"
    p={{ base: '14px', ml: '25px', md: '25px' }}
    templateRows="repeat(4, auto)"
    templateColumns="repeat(2, 1fr)"
    gap={4}
    background="rgba(0, 18, 183, 0.5)"
    borderRadius="8px"
    width="340px"
    height="sm"
    maxWidth="100%"

  >
<Text
  fontFamily="Futura"
  fontWeight="light"
  fontSize="24px"
  color="#FFFFFF"
  textAlign="center"
  paddingRight="30px"
  gridColumn="1 / 3"
  position="relative"
>
  IBC & Eth Assets
  <Box
    width="63%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"
    ml="50px"
    bottom="2px"
  />
</Text>
    <Flex direction="column">
      <Text
        fontFamily="Futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Monthly In
        <Box
    width="75%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="1px"
  />
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="18px"
        color="#FFFFFF"
      >
        ${monthlyIn.toLocaleString()}
      </Text>
    </Flex>
    <Flex direction="column">
      <Text
        fontFamily="Futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Monthly Out
        <Box
    width="85%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="1px"
  />
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="18px"
        color="#FFFFFF"
      >
        ${monthlyOut.toLocaleString()}
      </Text>
    </Flex>
    <Box
        borderRadius="1px"
        width="100%"
        height="4px"
        background="linear-gradient(270deg,  #FF4500 0%, #32CD32 100%)"
        gridColumn="1 / 3"
        position="relative"
      >
        <Box
          width="2px"
          height="8px"
          bgColor="white"
          position="absolute"
          left={`calc(${percentageDifference}% - 1px)`}
          top="-2px"
        />
      </Box>
    <Flex direction="column">
      <Text
        fontFamily="Futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Daily In
        <Box
    width="56%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="1px"
  />
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        ${dailyIn.toLocaleString()}
      </Text>
    </Flex>
    <Flex direction="column">
    <Text
        fontFamily="Futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Daily Out
        <Box
    width="65%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"

    bottom="1px"
  />
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        ${dailyOut.toLocaleString()}
      </Text>
    </Flex>
    <Box
        borderRadius="1px"
        width="100%"
        height="4px"
        background="linear-gradient(270deg,  #FF4500 0%, #32CD32 100%)"
        gridColumn="1 / 3"
        position="relative"
      >
        <Box
          width="2px"
          height="8px"
          bgColor="white"
          position="absolute"
          left={`calc(${percentageDifferenceDaily}% - 1px)`}
          top="-2px"
        />
      </Box>
  <Text
    fontFamily="Futura"
    mr="35px"
    align="center"
    fontWeight="light"
    fontSize="20px"
    textTransform="capitalize"
    color="#FFFFFF"
    gridColumn="1 / 3"
  >
    Biggest Movers
    <Box
    width="50%"
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position="relative"
    ml="66px"
    bottom="1px"
  />
  </Text>
  <HStack justifyContent="center"  spacing={12} gridColumn="1 / 3">
    <UnorderedList
      listStyleType="none"
      ml={0}
      pl={0}
      fontFamily="futura"
      fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      <ListItem>1. {biggestMover1.toLocaleString()}</ListItem>
      <ListItem>2. {biggestMover2.toLocaleString()}</ListItem>
      <ListItem>3. {biggestMover3.toLocaleString()}</ListItem>
    </UnorderedList>
    <UnorderedList
      listStyleType="none"
      ml={0}
      pl={0}
      fontFamily="futura"
      fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      <ListItem>4. {biggestMover4.toLocaleString()}</ListItem>
      <ListItem>5. {biggestMover5.toLocaleString()}</ListItem>
      <ListItem>6. {biggestMover6.toLocaleString()}</ListItem>
    </UnorderedList>
  </HStack>
  </Grid>
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent           top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined} >
          <ModalHeader fontFamily="Futura">Total Asset Movement</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px" >
            This grid item shows the total movement of bridged assets and IBC assets. Assets that are bridged in from Ethereum can be bridged bi-directionaly to any other IBC enabled blockchain. Bigget movers represents the assets with the most movement between Gravity Bridge & other chains.  
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Box>
   );
};


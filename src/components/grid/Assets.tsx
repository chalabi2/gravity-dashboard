import React, {useState, useEffect} from 'react';
import { Grid, Text, Box, Flex, ListItem, UnorderedList, HStack, IconButton, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useMediaQuery,
  SkeletonText,
Tooltip } from '@chakra-ui/react';
import { getTokenAmountTotals } from "../calculations/Assets";
import { useVolumeInfo } from '../calculations/GravityChainApi';
import { InfoIcon } from "@chakra-ui/icons";

function formatTotalAmount(amount: number, decimals: number): string {
  const formattedAmount = amount / Math.pow(10, decimals);
  return formattedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


export const Assets: React.FC = () => {
  const { today: volumeInfo, yesterday: yesterdayVolumeInfo } = useVolumeInfo();
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
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoIcon, setShowInfoIcon] = useState(false);
  
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [topDenoms, setTopDenoms] = useState<{ denom: string; totalAmounts: string; price: string; totalValue: number; }[]>([]);
  const [lastFetched, setLastFetched] = useState<number | null>(null);


  const fetchData = async () => {
    const now = Date.now();
    const cacheTimeout = 15 * 60 * 1000; // 15 minutes in milliseconds
  
    // If data is already fetched and cached within the valid time window, do not fetch again
    if (lastFetched && now - lastFetched < cacheTimeout) {
      return;
    }
  
    const data = await getTokenAmountTotals();
    setTopDenoms(data);
    setLastFetched(now); // Update the timestamp of the last fetched data
  };

  useEffect(() => {
    fetchData();
  }, []);
  

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
  Eth Assets
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
      <SkeletonText
                  isLoaded={!isLoading}
          noOfLines={1}
          skeletonHeight="5"
          >
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="18px"
        color="#FFFFFF"
      >
        ${monthlyIn.toLocaleString()}
      </Text>
      </SkeletonText>
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
        fontFamily="Futura"
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
  <ListItem>
  <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[0]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[0]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[0]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        1. {topDenoms[0]?.denom}
      </div>
    </Tooltip>
  </ListItem>
  <ListItem>
  <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[1]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[1]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[1]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        2. {topDenoms[1]?.denom}
      </div>
    </Tooltip>
  </ListItem>
  <ListItem>
  <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[2]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[2]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[2]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        3. {topDenoms[2]?.denom}
      </div>
    </Tooltip>
  </ListItem>
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
  <ListItem>
    <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[3]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[3]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[3]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        4. {topDenoms[3]?.denom}
      </div>
    </Tooltip>
  </ListItem>
  <ListItem>
  <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[4]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[4]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[4]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        5. {topDenoms[4]?.denom}
      </div>
    </Tooltip>
  </ListItem>
  <ListItem>
  <Tooltip
    bgColor="rgba(0, 0, 0, 0.8)"
    color="white"
  label={
    <Box
    fontFamily="Futura"
    >
      <Text>Price: ${topDenoms[5]?.price}</Text>
      <Text>Total Token Amount: {topDenoms[5]?.totalAmounts}</Text>
      <Text>Total Value: ${formatTotalAmount(topDenoms[5]?.totalValue, 0)}</Text>
    </Box>
  }
      aria-label="More information"
    >
      <div>
        6. {topDenoms[5]?.denom}
      </div>
    </Tooltip>
  </ListItem>
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


import { Stack, Text, HStack, Box, Modal,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useMediaQuery } from "@chakra-ui/react";
import VolumeComparisonChart from "../charts/VolumeComparisonCharts";
import { VolumeComparisonData } from "../calculations/VolumeComparison";
import { InfoIcon } from "@chakra-ui/icons";
import React, {useState} from "react";


interface LabelProps {
  children: React.ReactNode;
  color: string;
}

const Label: React.FC<LabelProps> = ({ children, color }) => (
  <Stack
    px="12px"
    py="2px"
    borderRadius="64px"
    direction="row"
    justify="center"
    align="center"
    overflow="hidden"
    width="90px"
    height="26px"
    background={color}
  >
    <Text
      fontFamily="futura"
      lineHeight="1.43"
      fontWeight="light"
      fontSize="16px"
      letterSpacing="0.32px"
      color="white"
    >
      {children}
    </Text>
  </Stack>
);

export const VolumeComparison = () => {
  
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
      <Box
  position="absolute"
  top={0}
  right={0}
  bottom={0}
  left={0}
  zIndex={2}
  display="flex"
  justifyContent="center"
  alignItems="center"
  bg="rgba(0, 0, 0, 0.9)"
>
  <Text fontFamily="Futura" color="red" fontSize="xl" fontWeight="bold">
    This elements data is innacurate and will be updated soon.
  </Text>
</Box>
    <IconButton
      aria-label="Info"
      icon={<InfoIcon />}
      position="absolute"
      top={2}
      left={2}
      size="xs"
      variant="ghost"
      color="white"
      zIndex={1}
      onClick={handleClick}
      style={{
        opacity: showInfoIcon ? 1 : 0, // Set opacity based on showInfoIcon state
        transition: 'opacity 0.3s ease-in-out', // Gradual opacity transition
      }}
    />
  <Stack
    paddingX="25px"
    paddingY="25px"
    borderRadius="6px"
    justify="flex-start"
    align="flex-start"
    spacing="10px"
    height="460px"
    py={-2}
    width={{md: "680px", base: "100%"}}
    background="rgba(0, 18, 183, 0.5)"
  >
    <Stack
      padding="10px"
      justify="flex-start"
      align="flex-start"
      spacing="10px"
      ml={{base: "-14px", md: "0"}}
    >
      <Text
        fontFamily="Futura"
        fontWeight="light"
        fontSize="26px"
        color="#FFFFFF"
        width="116.23px"
        height="39.26px"
      >
        Compare
        <Box
    width={{md: "86%", base: "85%"}}
    ml={{md: "0", base: "0px"}}
    height="1px"
    bgColor="rgb(255,255,255, 0.5)"
    position={{md: "relative", base: "sticky"}}

    bottom="1px"
  />
      </Text>
      <HStack
        pl={{ base: "0px", md: "40px" }}
        pb="35px"
        justifyContent="center"
        width="100%"
        marginTop="-10px"
        marginBottom="10px"
      >
        <Label color="#0053FF"><Text zIndex={0} color="white">Gravity</Text></Label>
        <Label color="#FF8C00"><Text zIndex={0} color="white">Axelar</Text></Label>
        <Label color="#9932CC"><Text color="white">Wormhole</Text></Label>
      </HStack>
      <HStack width="100%" justifyContent="space-between">
      <Box flexGrow={1} height={{ base: "250px", md: "375px" }} >
          <VolumeComparisonChart data={VolumeComparisonData} />
        </Box>
      </HStack>
    </Stack>
    </Stack>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={isMobile ? 0 : clickPosition.y}
          left={isMobile ? 0 : clickPosition.x}
          position={isMobile ? "initial" : "fixed"}
          bgColor={modalBgText}
          maxH={isMobile ? "100vh" : undefined} >
          <ModalHeader fontFamily="Futura">Volume Comparison Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Futura" fontSize="20px">
            This grid item compares the total volume bridged on Gravity with the total volume bridged on other generic messaging bridges.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
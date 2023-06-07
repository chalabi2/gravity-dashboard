import React from 'react';
import { Box, Text, VStack, useBreakpointValue, keyframes, useColorModeValue, Heading, Spinner, Image } from '@chakra-ui/react';
import { Logo } from "./theme/Logo";
import gravGif from '../grav.gif';

interface LoadingScreenProps {
  isLoaded: boolean;
}

const flashAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeOutAnimation = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoaded }) => {
  const fadeOut = useColorModeValue("1", "0");
  const filter = useColorModeValue("invert(1) brightness(0.2) hue-rotate(180deg)", "invert(2) hue-rotate(180deg)")

  return (
    <VStack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      animation={`${fadeOut} 10s ease-out forwards`}
      opacity={isLoaded ? fadeOut : '1'} // Change the opacity based on isLoaded state
    >
      <VStack spacing={2} alignItems="center">
      <Box
  sx={{
    filter: filter,
  }}
>
  <Image boxSize="300px" src={gravGif} alt="Loading" />
</Box>
        
      </VStack>
    </VStack>
  );
};

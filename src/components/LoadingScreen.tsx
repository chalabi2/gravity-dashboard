import React from 'react';
import { Box, Text, VStack, useBreakpointValue, keyframes, useColorModeValue, Heading } from '@chakra-ui/react';
import { Logo } from "./theme/Logo";

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
  const logoSize = useBreakpointValue({ base: "100%", md: "100%" });
  const headerTextColor = useColorModeValue("black", "white");

  return (
    <VStack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      animation={isLoaded ? `${fadeOutAnimation} 10s ease-in` : ''}
      opacity={isLoaded ? 0 : 1}
    >
      <VStack spacing={2} alignItems="center">
        <Logo height={logoSize} width={logoSize} />
        {isLoaded ? (
          <Text fontSize="xl" fontWeight="bold" animation={`${flashAnimation} 1s infinite`}>
            Fetching data...
          </Text>
        ) : (
          <Heading
            as="h1"
            fontFamily="Futura"
            lineHeight="1.36"
            fontWeight="medium"
            letterSpacing="0.1em"
            color={headerTextColor}
            fontSize="60px"
          >
            STATISTICS
          </Heading>
        )}
      </VStack>
    </VStack>
  );
};
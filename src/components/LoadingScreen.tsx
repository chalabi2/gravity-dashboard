import React from "react";
import { VStack, useColorModeValue, Image } from "@chakra-ui/react";
import gravGif from "../grav.gif";

interface LoadingScreenProps {
  isLoaded: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoaded }) => {
  const fadeOut = useColorModeValue("1", "0");

  return (
    <VStack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      animation={`${fadeOut} 10s ease-out forwards`}
      opacity={isLoaded ? fadeOut : "1"}
    >
      <VStack spacing={2} alignItems="center">
        <Image boxSize="300px" src={gravGif} alt="Loading" />
      </VStack>
    </VStack>
  );
};

import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";

interface MobileWarningProps {
  children: React.ReactNode;
}

export const MobileWarning: React.FC<MobileWarningProps> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <VStack
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {isMobile ? (
        <Text
          display={{ base: "block", md: "none" }}
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="white"
          zIndex={1000}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          fontWeight="bold"
          fontSize="2xl"
          p={6}
        >
          This page is designed for desktop devices.
        </Text>
      ) : (
        <>{children}</>
      )}
    </VStack>
  );
};

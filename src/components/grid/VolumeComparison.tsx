import { Stack, Text, VStack, HStack } from '@chakra-ui/react';

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
    width="72px"
    height="26px"
    background={color}
  >
    <Text
      fontFamily="futura"
      lineHeight="1.43"
      fontWeight="light"
      fontSize="14px"
      letterSpacing="0.32px"
      color="#D9D9D9"
    >
      {children}
    </Text>
  </Stack>
);

export const VolumeComparison = () => (
  <Stack
    paddingX="31px"
    paddingY="48px"
    borderRadius="6px"
    justify="flex-start"
    align="flex-start"
    spacing="10px"
    height="529px"
    width="99.3%"
    background="rgba(0, 18, 183, 0.35)"
  >
    <Stack padding="10px" justify="flex-start" align="flex-start" spacing="10px">
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="24px"
        color="#FFFFFF"
        width="116.23px"
        height="39.26px"
      >
        Compare
      </Text>
      <HStack justifyContent="center" width="100%" marginTop="-10px" marginBottom="10px">
        <Label color="rgba(0, 10, 255, 0.35)">Gravity</Label>
        <Label color="rgba(255, 0, 0, 0.35)">Axelar</Label>
        <Label color="rgba(86, 86, 86, 0.35)">Wormhole</Label>
      </HStack>
      <VStack alignItems="flex-start" spacing="12px">
        {[1000, 900, 800, 700, 600, 500, 400, 200].map((value, index) => (
          <Text
            key={index}
            fontFamily="futura"
            fontWeight="light"
            fontSize="16px"
            color="#FFFFFF"
            textAlign="center"
          >
            {value}
          </Text>
        ))}
      </VStack>
    </Stack>
  </Stack>
);

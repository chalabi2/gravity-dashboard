import { Stack, Text, HStack, Box } from "@chakra-ui/react";
import VolumeComparisonChart from "../charts/VolumeComparisonCharts";
import { VolumeComparisonData } from "../calculations/VolumeComparison";

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
      color="#D9D9D9"
    >
      {children}
    </Text>
  </Stack>
);

export const VolumeComparison = () => {
  return (
  <Stack
    paddingX="25px"
    paddingY="25px"
    borderRadius="6px"
    justify="flex-start"
    align="flex-start"
    spacing="10px"
    height="465px"
    width={{md: "99.3%", base: "100%"}}
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
        fontFamily="Futura MD BT"
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
    bgColor="#FFFFFF"
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
        <Label color="rgba(0, 255, 0, 0.5)"><Text color="white">Gravity</Text></Label>
        <Label color="rgba(255, 0, 0, 0.5)"><Text color="white">Axelar</Text></Label>
        <Label color="rgba(255, 255, 0, 0.5)"><Text color="white">Wormhole</Text></Label>
      </HStack>
      <HStack width="100%" justifyContent="space-between">
      <Box flexGrow={1} height={{ base: "250px", md: "375px" }} >
          <VolumeComparisonChart data={VolumeComparisonData} />
        </Box>
      </HStack>
    </Stack>
    </Stack>
  );
};
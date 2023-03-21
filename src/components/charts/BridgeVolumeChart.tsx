import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useBreakpointValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

interface BridgeVolumeChartProps {
  data: Array<{ x: string; y1: number }>;
}

const BridgeVolumeChart: React.FC<BridgeVolumeChartProps> = ({ data }) => {
  const containerWidth = useBreakpointValue({ base: "100%", md: "100%" });

  return (
    <Box
      mt={{ base: "", md: "-30px" }}
      width={{ base: "150px", md: "150" }}
      ml="15px"
    >
      <ResponsiveContainer width={containerWidth} height={110}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 4 }}>
          <Line type="monotone" dataKey="y1" stroke="rgba(0, 255, 0, 0.5)" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BridgeVolumeChart;

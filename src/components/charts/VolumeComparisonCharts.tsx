import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { useBreakpointValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

interface VolumeComparisonChartProps {
  data: Array<{ x: string; y1: number; y2: number; y3: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    const labels = ["Gravity", "Axelar", "Wormhole"];
  
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <p
            style={{
              fontFamily: "Futura MD BT",
              fontWeight: "light",
              fontSize: "16px",
              color: "white",
            }}
          >
            {`Date: ${label}`}
          </p>
          {payload.map((item, index) => (
            <p
              key={index}
              style={{
                fontFamily: "Futura MD BT",
                fontWeight: "light",
                fontSize: "16px",
                color: item.color,
              }}
            >
              {`${labels[index]}: $${item.value}M`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };

const VolumeComparisonChart: React.FC<VolumeComparisonChartProps> = ({ data }) => {

const containerWidth = useBreakpointValue({ base: "100%", md: "100%"});

  return (
    <Box p={{md: "4", base: "0px"}} pb={{md: "-4", base: "0px"}} borderRadius="8px" backgroundColor="" mt={{base: "", md: "-30px"}} width={{ base: "300px", md: "600px" }}>
    <ResponsiveContainer width={containerWidth} height={310}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <defs>
            <linearGradient id="Gravity" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0053FF" />
              <stop offset="100%" stopColor="#0053FF" />
            </linearGradient>
            <linearGradient id="Axelar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
            <linearGradient id="Wormhole" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9932CC" />
              <stop offset="100%" stopColor="#9932CC" />
            </linearGradient>
          </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey="x"
          tick={{
            fontFamily: "Futura MD BT",
            fontWeight: "light",
            fontSize: "16px",
            fill: "#FFFFFF",
          }}
        />
        <YAxis
  tick={{
    fontFamily: "Futura MD BT",
    fontWeight: "light",
    fontSize: "16px",
    fill: "#FFFFFF",
  }}
  tickFormatter={(value) => `$${value}M`}
/>
        <Tooltip content={<CustomTooltip />} />
        <Line  type="monotone" dataKey="y1" stroke="url(#Gravity)" strokeWidth={3} />
        <Line type="monotone" dataKey="y2" stroke="url(#Axelar)" strokeWidth={3} />
        <Line type="monotone" dataKey="y3" stroke="url(#Wormhole)" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
    </Box>
  );
};

export default VolumeComparisonChart;

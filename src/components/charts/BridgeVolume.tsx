import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [
    {
      label: 'My Data',
      data: [400, 300, 200, 100],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const BridgeVolumeChart = () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );

export default BridgeVolumeChart;

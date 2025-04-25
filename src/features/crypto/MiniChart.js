import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MiniChart = ({ data, color = '#4ade80' }) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className="w-24 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;

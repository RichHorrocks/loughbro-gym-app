import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={700} height="99%">
      <LineChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
          label={{ value: '%', position: 'insideLeft' }}
          domain={[0, 100]}
        />
        <Tooltip />
        <Legend />
        <Line
          name="Today"
          type="monotone"
          dataKey="todayPercent"
          stroke="#e6a587"
          activeDot={{ r: 4 }}
        />
        <Line
          name="Yesterday"
          type="monotone"
          dataKey="yesterdayPercent"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

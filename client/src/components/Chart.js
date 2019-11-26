import React from 'react';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Chart = ({ data }) => {
  const dataWithTimes = data.map(item => {
    const time = format(new Date(item.date), 'HH:mm');
    const percentage = (item.count / 180) * 100;

    return {
      ...item,
      percentage: Math.round(percentage),
      date: time
    };
  });

  return (
    <LineChart
      width={700}
      height={300}
      data={dataWithTimes}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: '%', position: 'insideLeft' }} domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line
        name="Today"
        type="monotone"
        dataKey="percentage"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default Chart;

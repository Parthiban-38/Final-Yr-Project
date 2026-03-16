import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SensorChart({ data }) {

  if (!data || data.length === 0) {
    return <p>No sensor history available</p>;
  }

 const formattedData = data
  .filter(item => item.time)
  .map((item) => {

    const date = new Date(Number(item.time));

    if (isNaN(date.getTime())) return null;

    return {
      ...item,
      timeLabel: date.toLocaleString()
    };

  })
  .filter(Boolean)
  .sort((a, b) => a.time - b.time);

  return (

    <ResponsiveContainer width="100%" height={350}>

      <LineChart data={formattedData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="timeLabel" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ff7043"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#42a5f5"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="soil_percentage"
          stroke="#66bb6a"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  );
}
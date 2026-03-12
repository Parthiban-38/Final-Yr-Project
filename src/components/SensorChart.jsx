import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function SensorChart({ data }) {

  return (

    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="time"
          tickFormatter={(t) =>
            new Date(t * 1000).toLocaleTimeString()
          }
        />

        <YAxis />

        <Tooltip
          labelFormatter={(t) =>
            new Date(t * 1000).toLocaleString()
          }
        />

        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ff7043"
        />

        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#42a5f5"
        />

        <Line
          type="monotone"
          dataKey="soil_percentage"
          stroke="#66bb6a"
        />

      </LineChart>
    </ResponsiveContainer>

  );
}
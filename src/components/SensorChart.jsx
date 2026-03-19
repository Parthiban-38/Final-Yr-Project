import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

export default function SensorChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        height: "350px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* ✅ BETTER X AXIS (TIMESTAMP) */}
          <XAxis
            dataKey="timestamp"
            tickFormatter={(t) =>
              new Date(t).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
            }
          />

          {/* Y AXIS */}
          <YAxis />

          {/* ✅ TOOLTIP WITH FULL DATE */}
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
            }
          />

          {/* LEGEND */}
          <Legend />

          {/* 🔥 TEMPERATURE */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff5722"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />

          {/* 💧 HUMIDITY */}
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#2196f3"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />

          {/* 🌱 SOIL */}
          <Line
            type="monotone"
            dataKey="soil_percentage"
            stroke="#4caf50"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
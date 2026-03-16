import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Sprout, Signal } from "lucide-react";
import SensorChart from "../components/SensorChart";
import useSensorData from "../hooks/useSensorData";

const Dashboard = () => {
  const { sensorData, loading } = useSensorData();

  useEffect(() => {
    console.log("Sensor Data:", sensorData);
  }, [sensorData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading sensor data...
      </div>
    );
  }

  const temperature = sensorData?.temperature || 0;
  const humidity = sensorData?.humidity || 0;
  const soilMoisture = sensorData?.soil_moisture || 0;
  const signal = sensorData?.signal || "Good";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">IoT Sensor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center"
        >
          <Thermometer className="text-red-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Temperature</p>
            <h2 className="text-2xl font-bold">{temperature} °C</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center"
        >
          <Droplets className="text-blue-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Humidity</p>
            <h2 className="text-2xl font-bold">{humidity} %</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center"
        >
          <Sprout className="text-green-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Soil Moisture</p>
            <h2 className="text-2xl font-bold">{soilMoisture}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex items-center"
        >
          <Signal className="text-purple-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Signal</p>
            <h2 className="text-2xl font-bold">{signal}</h2>
          </div>
        </motion.div>

      </div>

      <div className="mt-10">
        <SensorChart data={sensorData} />
      </div>
    </div>
  );
};

export default Dashboard;

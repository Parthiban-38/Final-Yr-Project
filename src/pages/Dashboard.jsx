// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Sprout, Signal } from "lucide-react";
import SensorChart from "../components/SensorChart";
import useSensorData from "../hooks/useSensorData";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
<<<<<<< HEAD
=======
import { speakFullPage } from "../utils/speakPage";
import { Volume2 } from "lucide-react";

>>>>>>> c22219921c0f8fba5b77b71ecc17596a145a6eac

export default function Dashboard() {
  const { data, history, connected } = useSensorData();

  // ✅ Live Date & Time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Default sensor values
  const temperature = data?.temperature ?? 0;
  const humidity = data?.humidity ?? 0;
  const soil = data?.soil_percentage ?? 0;
  const rssi = data?.rssi ?? "--";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#e8f5e9,#e3f2fd)",
        padding: "30px",
      }}
    >
<<<<<<< HEAD
=======
      <div>

      {/* 🔊 Speak Button */}
      <button
        onClick={speakFullPage}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "green",
          color: "white",
          padding: "12px",
          borderRadius: "50%"
        }}
      >
        <Volume2 />
      </button>

      {/* Your existing dashboard content */}

    </div>
>>>>>>> c22219921c0f8fba5b77b71ecc17596a145a6eac
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          🌾 Smart Agriculture Dashboard
        </h1>

        {/* DATE + TIME + STATUS + BUTTONS */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {currentTime.toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>

          {/* STATUS */}
          <div style={{ marginTop: "5px" }}>
            Status:
            {connected ? (
              <span style={{ color: "green", marginLeft: "8px" }}>● Connected</span>
            ) : (
              <span style={{ color: "red", marginLeft: "8px" }}>● Offline</span>
            )}
          </div>

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Link to="/recommender">
              <button
                style={{
                  padding: "8px 14px",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🌱 Recommender
              </button>
            </Link>
            <Link to="/history">
              <button
                style={{
                  padding: "8px 14px",
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                📊 History
              </button>
            </Link>

            {/* ✅ Logout Button */}
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* SENSOR CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <SensorCard
          icon={<Thermometer size={30} />}
          title="Temperature"
          value={`${temperature} °C`}
          color="#ff7043"
        />
        <SensorCard
          icon={<Droplets size={30} />}
          title="Humidity"
          value={`${humidity} %`}
          color="#42a5f5"
        />
        <SensorCard
          icon={<Sprout size={30} />}
          title="Soil Moisture"
          value={`${soil} %`}
          color="#66bb6a"
        />
        <SensorCard
          icon={<Signal size={30} />}
          title="LoRa Signal"
          value={`${rssi} dBm`}
          color="#ab47bc"
        />
      </div>

      {/* VIEW FULL HISTORY BUTTON */}
      <Link to="/history">
        <button
          style={{
            padding: "10px 18px",
            background: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          📊 View Full History
        </button>
      </Link>

      {/* CHART */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📊 Sensor History</h2>
        {history && history.length > 0 ? <SensorChart data={history} /> : <p>No sensor data available</p>}
      </div>
    </div>
  );
}

/* SENSOR CARD COMPONENT */
function SensorCard({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          background: color,
          color: "white",
          padding: "12px",
          borderRadius: "10px",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: "#777" }}>{title}</div>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</div>
      </div>
    </motion.div>
  );
}
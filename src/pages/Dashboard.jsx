import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Sprout, Signal, Volume2 } from "lucide-react";
import SensorChart from "../components/SensorChart";
import useSensorData from "../hooks/useSensorData";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const { data, history, connected } = useSensorData();

  const [currentTime, setCurrentTime] = useState(new Date());

  // 🕒 Time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔥 Voice load fix (IMPORTANT)
  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }, []);

  const temperature = data?.temperature ?? 0;
  const humidity = data?.humidity ?? 0;
  const soil = data?.soil_percentage ?? 0;
  const rssi = data?.rssi ?? "--";

  // 🔊 FINAL SPEAK FUNCTION
  const handleSpeak = () => {
    window.speechSynthesis.cancel(); // stop all (auto voice issue fix)

    const voices = window.speechSynthesis.getVoices();

    const englishVoice =
      voices.find(v => v.lang === "en-US") ||
      voices.find(v => v.lang.includes("en")) ||
      voices[0];

    const tamilVoice = voices.find(v => v.lang.includes("ta"));

    const textEN = `Temperature ${temperature} degree Celsius. Humidity ${humidity} percent. Soil moisture ${soil} percent.`;

    const textTA = `வெப்பநிலை ${temperature} டிகிரி செல்சியஸ். ஈரப்பதம் ${humidity} சதவீதம். மண் ஈரப்பதம் ${soil} சதவீதம்.`;

    const speechEN = new SpeechSynthesisUtterance(textEN);
    speechEN.voice = englishVoice;
    speechEN.rate = 0.9;

    const speechTA = new SpeechSynthesisUtterance(textTA);
    speechTA.voice = tamilVoice;
    speechTA.rate = 0.85;

    // English → Tamil chain
    speechEN.onend = () => {
      if (tamilVoice) {
        window.speechSynthesis.speak(speechTA);
      }
    };

    window.speechSynthesis.speak(speechEN);
  };

  return (
    <div style={styles.container}>
      
      {/* 🔊 Speak Button */}
      <button onClick={handleSpeak} style={styles.speakBtn}>
        <Volume2 />
      </button>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🌾 Smart Agriculture Dashboard</h1>

        <div style={styles.rightBox}>
          <div style={styles.time}>
            {currentTime.toLocaleString()}
          </div>

          <div>
            Status:
            <span style={connected ? styles.connected : styles.offline}>
              ● {connected ? "Connected" : "Offline"}
            </span>
          </div>

          <div style={styles.btnGroup}>
            <Link to="/recommender">
              <button style={{ ...styles.btn, background: "#2d6a4f" }}>
                🌱 Recommender
              </button>
            </Link>

            <Link to="/history">
              <button style={{ ...styles.btn, background: "#40916c" }}>
                📊 History
              </button>
            </Link>

            <LogoutButton />
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.cardContainer}>
        <SensorCard icon={<Thermometer />} title="Temperature" value={`${temperature} °C`} color="#ff7043" />
        <SensorCard icon={<Droplets />} title="Humidity" value={`${humidity} %`} color="#42a5f5" />
        <SensorCard icon={<Sprout />} title="Soil Moisture" value={`${soil} %`} color="#66bb6a" />
        <SensorCard icon={<Signal />} title="LoRa Signal" value={`${rssi} dBm`} color="#ab47bc" />
      </div>

      {/* HISTORY BUTTON */}
      <Link to="/history">
        <button style={styles.fullHistoryBtn}>📊 View Full History</button>
      </Link>

      {/* CHART */}
      <div style={styles.chartBox}>
        <h2 style={{ marginBottom: "20px" }}>📊 Sensor History</h2>
        {history?.length ? (
          <SensorChart data={history} />
        ) : (
          <p>No sensor data available</p>
        )}
      </div>
    </div>
  );
}

/* SENSOR CARD */
function SensorCard({ icon, title, value, color }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} style={styles.card}>
      <div style={{ ...styles.iconBox, background: color }}>{icon}</div>
      <div>
        <div style={styles.cardTitle}>{title}</div>
        <div style={styles.cardValue}>{value}</div>
      </div>
    </motion.div>
  );
}

/* STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "25px",
    background: "linear-gradient(135deg,#d4fc79,#96e6a1)",
    fontFamily: "Segoe UI",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "bold",
  },

  rightBox: {
    textAlign: "right",
  },

  time: {
    fontWeight: "bold",
    marginBottom: "5px",
  },

  connected: {
    color: "green",
    marginLeft: "8px",
  },

  offline: {
    color: "red",
    marginLeft: "8px",
  },

  btnGroup: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },

  btn: {
    padding: "8px 14px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  iconBox: {
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
  },

  cardTitle: {
    color: "#555",
  },

  cardValue: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  fullHistoryBtn: {
    padding: "10px 18px",
    background: "#2d6a4f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  chartBox: {
    background: "rgba(255,255,255,0.8)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  speakBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#2d6a4f",
    color: "white",
    padding: "14px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};
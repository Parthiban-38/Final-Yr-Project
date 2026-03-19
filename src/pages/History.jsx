// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import SensorChart from "../components/SensorChart";
import LogoutButton from "../components/LogoutButton";

export default function History() {
    const [historyData, setHistoryData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live date & time
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch from Firebase
    useEffect(() => {
        const historyRef = ref(database, "farm_monitoring/history");
        const unsubscribe = onValue(historyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formatted = Object.keys(data).map((key) => {
                    const ts = Number(key);
                    const dateObj = !isNaN(ts)
                        ? ts.toString().length === 10
                            ? new Date(ts * 1000)
                            : new Date(ts)
                        : new Date();
                    return {
                        ...data[key],
                        timestamp: dateObj.getTime(),
                        datetime: dateObj.toLocaleString(),
                        date: dateObj.toLocaleDateString(),
                        time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    };
                });
                formatted.sort((a, b) => b.timestamp - a.timestamp);
                setHistoryData(formatted);
            } else setHistoryData([]);
        });
        return () => unsubscribe();
    }, []);

    // Filter by date
    const filteredData = historyData.filter((item) =>
        selectedDate ? item.date === new Date(selectedDate).toLocaleDateString() : true
    );

    // Summary average
    const avg = (key) =>
        filteredData.length
            ? (filteredData.reduce((sum, item) => sum + item[key], 0) / filteredData.length).toFixed(1)
            : 0;

    // Download CSV
    const downloadCSV = () => {
        if (!filteredData.length) return alert("No data to download");

        const headers = ["Date", "Time", "Temperature", "Humidity", "Soil Moisture", "RSSI"];
        const rows = filteredData.map((item) => [
            `"${item.date}"`,
            `"${item.time}"`,
            item.temperature,
            item.humidity,
            item.soil_percentage,
            item.rssi,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((row) => row.join(",")).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "farm_history.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ padding: "30px", background: "linear-gradient(135deg,#e8f5e9,#e3f2fd)", minHeight: "100vh" }}>
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
                <h1>📊 Farm Data History</h1>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {currentTime.toLocaleString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })}
                    </div>
                    <div style={{ marginTop: "5px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <Link to="/dashboard">
                            <button style={{ padding: "8px 14px", background: "#2196f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                                ← Dashboard
                            </button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>

            {/* FILTER + DOWNLOAD */}
            <div style={{ margin: "20px 0", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                <button onClick={downloadCSV} style={{ background: "#4caf50", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>
                    ⬇ Download CSV
                </button>
            </div>

            {/* SUMMARY */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "15px", marginBottom: "25px" }}>
                <Card title="Avg Temp" value={`${avg("temperature")} °C`} color="#ff7043" />
                <Card title="Avg Humidity" value={`${avg("humidity")} %`} color="#42a5f5" />
                <Card title="Avg Soil" value={`${avg("soil_percentage")} %`} color="#66bb6a" />
                <Card title="Total Records" value={filteredData.length} color="#ab47bc" />
            </div>

            {/* CHART */}
            <div style={cardStyle}>
                <SensorChart data={filteredData} />
            </div>

            {/* TABLE */}
            <div style={{ ...cardStyle, marginTop: "20px", overflowX: "auto" }}>
                <table style={{ width: "100%", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Temp (°C)</th>
                            <th>Humidity (%)</th>
                            <th>Soil Moisture (%)</th>
                            <th>RSSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.temperature}</td>
                                <td>{item.humidity}</td>
                                <td>{item.soil_percentage}</td>
                                <td>{item.rssi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!filteredData.length && <p style={{ textAlign: "center", marginTop: "10px" }}>⏳ Waiting for sensor data...</p>}
            </div>
        </div>
    );
}

// CARD COMPONENT
function Card({ title, value, color }) {
    return (
        <div style={cardStyle}>
            <div style={{ color: "#777" }}>{title}</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color }}>{value}</div>
        </div>
    );
}

// COMMON CARD STYLE
const cardStyle = {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};
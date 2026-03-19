import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export default function useSensorData() {
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // 🔴 REALTIME DATA
    const realtimeRef = ref(database, "farm_monitoring/realtime");

    const realtimeCallback = onValue(realtimeRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        setConnected(true);
      } else {
        setConnected(false);
      }
    });

    // 🔵 HISTORY DATA
    const historyRef = ref(database, "farm_monitoring/history");

    const historyCallback = onValue(historyRef, (snapshot) => {
      const raw = snapshot.val();

      if (!raw) {
        setHistory([]);
        return;
      }

      const formatted = Object.keys(raw)
        .map((key) => {
          const ts = Number(key);
          if (isNaN(ts)) return null;

          // ✅ Convert timestamp safely
          const dateObj = new Date(
            key.length === 10 ? ts * 1000 : ts
          );

          return {
            timestamp: dateObj.getTime(), // 🔥 IMPORTANT (for sorting)
            time: dateObj.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit", // 🔥 more accuracy
              hour12: true,
              timeZone: "Asia/Kolkata",
            }),
            fullTime: dateObj.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            temperature: raw[key]?.temperature ?? 0,
            humidity: raw[key]?.humidity ?? 0,
            soil_percentage: raw[key]?.soil_percentage ?? 0,
            rssi: raw[key]?.rssi ?? 0,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.timestamp - b.timestamp); // ✅ PERFECT SORT

      // ✅ LAST 20 DATA POINTS (smooth chart)
      setHistory(formatted.slice(-20));
    });

    // 🧹 CLEANUP (CORRECT WAY)
    return () => {
      off(realtimeRef, "value", realtimeCallback);
      off(historyRef, "value", historyCallback);
    };
  }, []);

  return { data, history, connected };
}
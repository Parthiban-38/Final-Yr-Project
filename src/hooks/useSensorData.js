import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export default function useSensorData() {

  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    // REALTIME DATA
    const realtimeRef = ref(database, "farm_monitoring/realtime");

    onValue(realtimeRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        setConnected(true);
      }
    });


    // HISTORY DATA
    const historyRef = ref(database, "farm_monitoring/history");

    onValue(historyRef, (snapshot) => {

      const raw = snapshot.val();
      if (!raw) return;

      const formatted = Object.keys(raw).map((timestamp) => ({
        time: Number(timestamp),
        temperature: raw[timestamp].temperature,
        humidity: raw[timestamp].humidity,
        soil_percentage: raw[timestamp].soil_percentage,
        rssi: raw[timestamp].rssi
      }));

      // sort by timestamp
      formatted.sort((a, b) => a.time - b.time);

      // keep last 24 points
      setHistory(formatted.slice(-24));

    });

  }, []);

  return { data, history, connected };
}
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
      } else {
        setConnected(false);
      }
    });


    // HISTORY DATA
    const historyRef = ref(database, "farm_monitoring/history");

    onValue(historyRef, (snapshot) => {

      const raw = snapshot.val();
      if (!raw) return;

      const formatted = Object.keys(raw)
  .map((timestamp) => {

    let timeValue;

    if (!isNaN(timestamp) && timestamp.length >= 10) {
      timeValue = Number(timestamp) * 1000;
    }
    else if (timestamp.includes("_")) {

      const clean = timestamp
        .replace("_", " ")
        .replace(/-/g, ":")
        .replace(": ", " ");

      timeValue = new Date(clean).getTime();
    }
    else {
      return null;
    }

    return {
      time: timeValue,
      temperature: raw[timestamp].temperature,
      humidity: raw[timestamp].humidity,
      soil_percentage: raw[timestamp].soil_percentage,
      rssi: raw[timestamp].rssi
    };

  })
  .filter(Boolean);

      // SORT BY TIME
      formatted.sort((a, b) => a.time - b.time);

      // KEEP LAST 24 RECORDS
      setHistory(formatted.slice(-24));

    });

  }, []);

  return { data, history, connected };
}
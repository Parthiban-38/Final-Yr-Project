
import React, { useEffect } from "react";
>>>>>>> e86e56f42c169b2597d3bd832dd3017fffe31ba2
import { motion } from "framer-motion";
import { Thermometer, Droplets, Sprout, Signal } from "lucide-react";
import SensorChart from "../components/SensorChart";
import useSensorData from "../hooks/useSensorData";

export default function Dashboard() {

  const { data, history, connected } = useSensorData();

  // Tamil voice recommendation
  function speakRecommendation(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "ta-IN";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  // Sensor condition voice alerts
  useEffect(() => {

    if (data.soil_percentage < 20) {

      speakRecommendation(
        "மண் மிகவும் உலர்ந்துள்ளது. தயவு செய்து வயலில் தண்ணீர் பாசனம் செய்யுங்கள்."
      );

    }

    else if (data.temperature > 35) {

      speakRecommendation(
        "வெப்பநிலை அதிகமாக உள்ளது. பயிர்களுக்கு வெப்ப அழுத்தம் ஏற்பட வாய்ப்பு உள்ளது."
      );

    }

    else if (data.humidity < 30) {

      speakRecommendation(
        "காற்றில் ஈரப்பதம் குறைவாக உள்ளது. பாசனம் பரிந்துரைக்கப்படுகிறது."
      );

    }

  }, [data]);

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#e8f5e9,#e3f2fd)",
      padding: "30px"
    }}>

      
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"30px"
      }}>

        <h1 style={{fontSize:"32px",fontWeight:"bold"}}>
          🌾 Smart Agriculture Dashboard
        </h1>

        <div style={{fontSize:"18px"}}>
          Status:
          {connected ? (

            <span style={{color:"green",marginLeft:"10px"}}>● Connected</span>
          ) : (
            <span style={{color:"red",marginLeft:"10px"}}>● Offline</span>

            <span style={{color:"green",marginLeft:"10px"}}> ● Connected</span>
          ) : (
            <span style={{color:"red",marginLeft:"10px"}}> ● Offline</span>

          )}
        </div>

      </div>

      {/* SENSOR CARDS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"20px",
        marginBottom:"40px"
      }}>

        <SensorCard
          icon={<Thermometer size={30}/>}
          title="Temperature"

          value={`${data?.temperature ?? 0} °C`}

          value={`${data.temperature || 0} °C`}

          color="#ff7043"
        />

        <SensorCard
          icon={<Droplets size={30}/>}
          title="Humidity"

          value={`${data?.humidity ?? 0} %`}

          value={`${data.humidity || 0} %`}

          color="#42a5f5"
        />

        <SensorCard
          icon={<Sprout size={30}/>}
          title="Soil Moisture"

          value={`${data?.soil_percentage ?? 0} %`}

          value={`${data.soil_percentage || 0} %`}

          color="#66bb6a"
        />

        <SensorCard
          icon={<Signal size={30}/>}
          title="LoRa Signal"

          value={`${data?.rssi ?? "--"} dBm`}

          value={`${data.rssi || "--"} dBm`}

          color="#ab47bc"
        />

      </div>

      {/* CHART */}
      <div style={{
        background:"white",
        borderRadius:"12px",
        padding:"20px",
        boxShadow:"0 8px 20px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{marginBottom:"20px"}}>
          📊 Sensor History
        </h2>


        <SensorChart data={history} />

        <SensorChart data={history}/>


      </div>

    </div>
  );
}

function SensorCard({ icon, title, value, color }) {

  return (

    <motion.div
      whileHover={{scale:1.05}}
      style={{
        background:"white",
        padding:"20px",
        borderRadius:"12px",
        boxShadow:"0 8px 15px rgba(0,0,0,0.1)",
        display:"flex",
        alignItems:"center",
        gap:"15px"
      }}
    >

      <div style={{
        background:color,
        color:"white",
        padding:"12px",
        borderRadius:"10px"
      }}>
        {icon}
      </div>

      <div>
        <div style={{color:"#777"}}>{title}</div>
        <div style={{fontSize:"22px",fontWeight:"bold"}}>{value}</div>
      </div>

    </motion.div>

  );

}

}


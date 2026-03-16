import React from "react";
import { motion } from "framer-motion";

export default function History() {

  const historyData = [
    { month: "Jan", temperature: 25, humidity: 65, soil: 40 },
    { month: "Feb", temperature: 26, humidity: 66, soil: 41 },
    { month: "Mar", temperature: 27, humidity: 67, soil: 42 },
    { month: "Apr", temperature: 28, humidity: 68, soil: 43 },
  ];

  return (

    <div style={{
      minHeight:"100vh",
      padding:"30px",
      background:"linear-gradient(135deg,#e3f2fd,#e8f5e9)"
    }}>

      <h1 style={{fontSize:"32px",marginBottom:"20px"}}>
        📊 Farm History Data
      </h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"20px"
      }}>

        {historyData.map((item,index)=>(
          
          <motion.div
            key={index}
            whileHover={{scale:1.05}}
            style={{
              background:"white",
              padding:"20px",
              borderRadius:"10px",
              boxShadow:"0 8px 15px rgba(0,0,0,0.1)"
            }}
          >

            <h3>{item.month}</h3>

            <p>🌡 Temperature: {item.temperature} °C</p>

            <p>💧 Humidity: {item.humidity} %</p>

            <p>🌱 Soil Moisture: {item.soil} %</p>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

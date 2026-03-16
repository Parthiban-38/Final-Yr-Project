import { useState } from "react";

export default function Navbar({ connected, onLanguageChange }) {

  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {

    const newLang = lang === "en" ? "ta" : "en";
    setLang(newLang);

    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  return (

    <nav
      style={{
        background: "#020617",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h2>🌱 Smart Agriculture Dashboard</h2>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        <span>
          Status:
          {connected ? " 🟢 Connected" : " 🔴 Offline"}
        </span>

        <button
          onClick={toggleLanguage}
          style={{
            padding: "6px 12px",
            background: "#16a34a",
            border: "none",
            borderRadius: "6px",
            color: "white"
          }}
        >
          {lang === "en" ? "தமிழ்" : "English"}
        </button>

      </div>

    </nav>

  );
}
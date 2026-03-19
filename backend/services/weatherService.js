    // private static final String key="325b000030ddc9c2948a60ba94c2bfc5";
    // private static final String url= "https://api.openweathermap.org/data/2.5/weather?q=";

const axios = require("axios");

const API_KEY = "325b000030ddc9c2948a60ba94c2bfc5"; // 🔑 from OpenWeather

async function getWeather() {
  try {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: "Erode,IN",
          appid: API_KEY,
          units: "metric"
        }
      }
    );

    return {
      windSpeed: res.data.wind.speed,
      temp_api: res.data.main.temp,
      humidity_api: res.data.main.humidity
    };

  } catch (err) {
    console.error("❌ Weather API error:", err.message);
    return null;
  }
}

module.exports = { getWeather };
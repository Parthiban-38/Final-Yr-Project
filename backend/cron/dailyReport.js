const cron = require("node-cron");
const admin = require("firebase-admin");

const { generateReport, generateShortSMS } = require("../utils/languageHelper");
const { sendSMS } = require("../services/twilioservice");
const { sendWhatsApp } = require("../services/whatsappService");
const { getWeather } = require("../services/weatherService");
// const { sendEmail } = require("../services/emailService");

// 🔥 Initialize Firebase Admin (ONLY ONCE)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require("../firebase/serviceAccountKey.json")
    ),
    databaseURL: "https://lora-d4040-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

const db = admin.database();

/**
 * 📊 Get all users from Firebase
 */
async function getUsers() {
  try {
    const snapshot = await db.ref("users").once("value");

    if (!snapshot.exists()) return [];

    const usersObj = snapshot.val();

    return Object.keys(usersObj).map((uid) => ({
      id: uid,
      ...usersObj[uid]
    }));
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    return [];
  }
}

/**
 * 🌱 Get sensor data (Replace with real API/DB)
 */
/**
 * 🌱 Get Sensor Data from Firebase + Weather API
 */
async function getSensorData(user) {
  try {
    // ✅ 1. Get realtime sensor data from Firebase
    const snapshot = await db.ref("farm_monitoring/realtime").once("value");

    if (!snapshot.exists()) {
      console.log("⚠️ No realtime data in Firebase");
      return null;
    }

    const sensor = snapshot.val();

    // ✅ 2. Get weather (wind speed) using location
    let windSpeed = 0;

    if (user.location) {
      try {
        const weather = await getWeather(user.location);
        windSpeed = weather?.windSpeed || 0;
      } catch (err) {
        console.log("⚠️ Weather API failed, using 0 wind");
      }
    }

    // ✅ 3. Return combined data
    return {
      temp: sensor.temperature,
      humidity: sensor.humidity,
      soilMoisture: sensor.soil_percentage,
      windSpeed: windSpeed
    };

  } catch (err) {
    console.error("❌ Data fetch error:", err.message);
    return null;
  }
}
async function processUser(user) {
  try {
    const phone = user.phone?.replace(/\s+/g, "");
    if (!phone) {
      console.log("⚠️ No phone");
      return;
    }

    const lang = user.language || "ta";

    // ✅ MUST BE FIRST
    const data = await getSensorData(user);

    if (!data) {
      console.log("⚠️ No sensor data");
      return;
    }

    // ✅ USE AFTER DECLARATION
    const sms = generateShortSMS(data, lang);
    const report = generateReport(data, lang);

    await sendSMS(phone, sms);
    await sendWhatsApp(phone, report);

    console.log(`✅ Sent to ${phone}`);

  } catch (err) {
    console.error(`❌ Error for user ${user.id}:`, err.message);
  }
}
/**
 * 📩 Send report to a single user
 */
// function formatPhone(num) {
//   return num.replace(/\s+/g, "");
// }
// async function processUser(user) {
//   try {
//     if (!user.phone) return;
//     if (!data) {
//   console.log("⚠️ Skipping user (no data)");
//   return;
// }

//     const lang = user.language || "ta";
//     // const phone = formatPhone(user.phone);
//     const data = await getSensorData(user);

//     // ✅ 1. SHORT SMS
//     const shortMsg = generateShortSMS(data,lang);
//     await sendSMS(user.phone, shortMsg);

//     // ✅ 2. FULL REPORT
//     const fullReport = generateReport(data, lang);

//     // WhatsApp
//     await sendWhatsApp(user.phone, fullReport);

//     // Email (optional)
//     // if (user.email) {
//     //   await sendEmail(user.email, fullReport);
//     // }

//     console.log(`✅ All alerts sent to ${user.phone}`);
//   } catch (err) {
//     console.error(`❌ Error for user ${user.id}:`, err.message);
//   }
// }
/**
 * 🌇 DAILY EVENING CRON JOB (6:00 PM IST)
 */
cron.schedule(
  "23 22 * * *",
  async () => {
    console.log("🌇 Running Evening Daily Report Job...");

    const users = await getUsers();

    if (!users.length) {
      console.log("⚠️ No users found");
      return;
    }

    for (let user of users) {
      await processUser(user);
    }

    console.log("✅ Evening Reports Sent Successfully");
  },
  {
    timezone: "Asia/Kolkata"
  }
);

/**
 * 🧪 TEST MODE (Uncomment to test every minute)
 */
// cron.schedule("* * * * *", async () => {
//   console.log("🧪 Testing cron...");
//   const users = await getUsers();
//   for (let user of users) {
//     await processUser(user);
//   }
// });

module.exports = {};
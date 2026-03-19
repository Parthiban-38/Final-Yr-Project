require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sendSMS } = require("./services/twilioservice");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * 📩 Send SMS API (dynamic)
 */
app.post("/sendSMS", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: "Phone & message required" });
    }

    await sendSMS(phone, message);

    res.json({ success: true, message: "SMS Sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🔥 Import Cron Job
 */
require("./cron/dailyReport");

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
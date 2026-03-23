require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sendSMS } = require("./services/twilioservice");

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const client = twilio(
  "AC433c0707775e5bb4134b44426a87cd3f",
  "0a74a54f7bebccd8d812985c447a1b5c"
);

=======
/**
 * 📩 Send SMS API (dynamic)
 */
>>>>>>> c22219921c0f8fba5b77b71ecc17596a145a6eac
app.post("/sendSMS", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: "Phone & message required" });
    }

<<<<<<< HEAD
  await client.messages.create({
    body: message,
    from: "+12292976849",
    to: "+919047114805"
  });

  res.send("SMS Sent");
=======
    await sendSMS(phone, message);
>>>>>>> c22219921c0f8fba5b77b71ecc17596a145a6eac

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
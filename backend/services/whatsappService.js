const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

async function sendWhatsApp(to, message) {
  try {
    const res = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${to}`,
      body: message,
    });

    console.log("✅ WhatsApp sent:", res.sid);
  } catch (err) {
    console.error("❌ WhatsApp Error:", err.message);
  }
}

module.exports = { sendWhatsApp };
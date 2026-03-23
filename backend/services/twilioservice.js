const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(phone, message) {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    console.log("✅ SMS sent:", res.sid);
    return res;
  } catch (err) {
    console.error("❌ Twilio SMS Error:", err.message);
  }
}

async function makeCall(phone, message, lang) {
  try {
    const voiceLang = lang === "en" ? "en-US" : "ta-IN";

    const res = await client.calls.create({
      twiml: `<Response><Say language="${voiceLang}">${message}</Say></Response>`,
      to: phone,
      from: process.env.TWILIO_PHONE
    });

    console.log("📞 Call placed:", res.sid);
    return res;
  } catch (err) {
    console.error("❌ Twilio Call Error:", err.message);
  }
}

module.exports = { sendSMS, makeCall };
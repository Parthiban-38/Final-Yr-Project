const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors());
app.use(express.json());

const client = twilio(
  "SID",
  "twwilio"
);

app.post("/sendSMS", async (req, res) => {

  const { message } = req.body;

  await client.messages.create({
    body: message,
    from: "+12292976849",
    to: "+919047114805"
  });

  res.send("SMS Sent");

});

app.listen(5000);
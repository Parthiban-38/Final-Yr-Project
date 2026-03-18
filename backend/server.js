const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors());
app.use(express.json());

const client = twilio(
  "AC433c0707775e5bb4134b44426a87cd3f",
  "0a74a54f7bebccd8d812985c447a1b5c"
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
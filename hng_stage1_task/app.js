//importing node modules...
const http = require("http");
const express = require("express");
const cors = require("cors");
const iplocation = require("iplocation").default;
const requestIp = require("request-ip");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());
app.use(cors());
app.use(express.json());
app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name;
  let clientIp = req.clientIp;

  if (clientIp === "::1" || clientIp === "::ffff:127.0.0.1") {
    clientIp = "127.0.0.1";
  }

  console.log(clientIp);
  try {
    const location = await iplocation(clientIp);
    if (visitorName) {
      res.status(200).json({
        client_ip: clientIp,
        location: location.city,
        greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${location.city}`,
      });
    } else {
      res.status(400).json({ message: "Bad Request!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
module.exports = app;

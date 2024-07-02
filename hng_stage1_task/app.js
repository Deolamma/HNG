//importing node modules...
const http = require("http");
const express = require("express");
const cors = require("cors");
const geoip = require("geoip-country");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/api/hello", (req, res) => {
  const visitorName = req.query.visitor_name;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  console.log(ip);
  const geo = geoip.lookup(ip);

  console.log(geo);
  const country = geo.country && "Nigeria";

  if (visitorName) {
    res.status(200).json({
      client_ip: ip,
      location: country,
      greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${country}`,
    });
  } else {
    res.status(400).json({ message: "Bad Request!" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
module.exports = app;

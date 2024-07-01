//importing node modules...
const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name;
  const ip = req.ip;
  const location = "New York";

  if (visitorName) {
    res.status(200).json({
      client_ip: ip,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${location}`,
    });
  } else {
    res.status(400).json({ message: "Bad Request!" });
  }
});
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

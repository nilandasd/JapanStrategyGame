require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const server = require("https");
const PORT = process.env.PORT || 5000;
const uri = process.env.URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://localhost:5000"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

//SELF SIGNED!
server
  .createServer(
    {
      key: process.env.PRIVATE_KEY,
      cert: process.env.CERTIFICATE,
    },
    app
  )
  .listen(PORT, () => console.log(`server listening on port: ${PORT}`));

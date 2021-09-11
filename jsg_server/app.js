require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const { initialize } = require("express-openapi");
const swaggerUi = require("swagger-ui-express");
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

app.listen(3030);
app.use(logger("dev"));
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths",
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);



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

const express = require("express");
const router = express.Router();
const verifyToken = require("../util/verifyToken");
const initGame = require("../gameController/initGame");
const validateMove = require("../gameController/validateMove");
const Game = require("../models/gameController");

router.use("/", (req, res, next) => verifyToken(req, res, next));

router.post("/start", async (req, res) => {
  res.status(200)
});

module.exports = router;

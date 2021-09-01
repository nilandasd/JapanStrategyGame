const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
// const secret = fs.readFileSync("jwt.key");

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/", (req, res) => {
    console.log(req.body);
    res.status(200).json({message: "success!"});
});
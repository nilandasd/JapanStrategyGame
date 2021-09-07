const jwt = require("jsonwebtoken");

const generateToken = (res, username) => {
  const expiration = process.env.DB_ENV === "testing" ? 100000 : 604800000;
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });
  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: true, // using https
    httpOnly: true,
  });
};

module.exports = generateToken;

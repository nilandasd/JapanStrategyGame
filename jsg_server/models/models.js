const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({ username: String, password: String }, { timestamps: true })
);

const Game = mongoose.model(
  "Game",
  new Schema(
    { players: Object, moves: Array, winner: Boolean },
    { timestamps: true }
  )
);

module.exports = {
  User,
  Game,
};

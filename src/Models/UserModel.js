const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true],
      default: 0,
    },
    first_name: {
      type: String,
      required: [true],
    },
    last_name: {
      type: String,
      required: [true],
    },
    handle_name: {
      type: String,
      required: [true],
    },
    credential_id: {
      type: String,
      required: [true],
    },
    state: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
    },
    password: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;

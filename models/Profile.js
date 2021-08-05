const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  blood: {
    type: String,
  },

  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
  },
  joindate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("profile", ProfileSchema);

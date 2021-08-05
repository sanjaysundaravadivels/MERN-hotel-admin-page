const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});
module.exports = LeaveRequest = mongoose.model(
  "leaveRequest",
  LeaveRequestSchema
);

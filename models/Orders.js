const mongoose = require("mongoose");

const OrdersScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
  },
  order: [
    {
      title: {
        type: String,
      },
      count: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});
module.exports = Orders = mongoose.model("orders", OrdersScema);

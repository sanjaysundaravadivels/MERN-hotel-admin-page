const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
module.exports = OrderStatus = mongoose.model("orderStatus", OrderStatusSchema);

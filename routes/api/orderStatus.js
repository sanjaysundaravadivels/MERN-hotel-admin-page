const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Orders = require("../../models/Orders");
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const OrderStatus = require("../../models/OrderStatus");

// @rute Post api/orderstatus
// @desc Create orderstatus menu
// @access Private

router.post(
  "/",
  [auth, [check("completed", "Status is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { completed, order } = req.body;

    //Build profile object
    const orderStatusItem = { order, completed };

    try {
      let orderStatus = await OrderStatus.findOne({ order });
      if (orderStatus) {
        //update
        orderStatus = await OrderStatus.findOneAndUpdate(
          { order },
          { $set: orderStatusItem },
          { new: true }
        );
        return res.json(orderStatus);
      }
      //create
      orderStatus = new OrderStatus(orderStatusItem);
      await orderStatus.save();
      res.json(orderStatus);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @rute GET api/orderStatus
// @desc Get all orderStatus
// @access Publc

router.get("/", async (req, res) => {
  try {
    const orderStatus = await OrderStatus.find();
    res.json(orderStatus);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute Delete api/orderStatus/:id
// @desc Delete  an item
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    const orderStatus = await OrderStatus.findOneAndRemove({
      _id: req.params.id,
    });

    // res.json(feedback);
    res.json({ msg: "item deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const LeaveRequest = require("../../models/LeaveRequest");
const User = require("../../models/User");
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @rute Post api/menu
// @desc Create or update menu
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("date", "Date is required").not().isEmpty(),
      check("reason", "Reason is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { date, reason } = req.body;
    const user = req.user.id;
    //Build profile object
    const leaveRequestItem = { date, reason, user };

    try {
      //create
      let leaveRequest = new LeaveRequest(leaveRequestItem);
      await leaveRequest.save();
      res.json(leaveRequest);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @rute GET api/leaveRequest
// @desc Get all leaveRequest
// @access Publc

router.get("/", async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.find();
    res.json(leaveRequest);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute Delete api/leaveRequest/:id
// @desc Delete  an item
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    const leaveRequest = await LeaveRequest.findOneAndRemove({
      _id: req.params.id,
    });

    // res.json(leaveRequest);
    res.json({ msg: "item deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

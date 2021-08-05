const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Feedback = require("../../models/Feedback");
const User = require("../../models/User");
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @rute Post api/menu
// @desc Create or update menu
// @access Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { text } = req.body;
    const user = req.user.id;
    //Build profile object
    const feedbackItem = { text, user };

    try {
      let feedback = await Feedback.findOne({ text });
      if (feedback) {
        //update
        feedback = await Feedback.findOneAndUpdate(
          { text },
          { $set: feedbackItem },
          { new: true }
        );
        return res.json(feedback);
      }
      //create
      feedback = new Feedback(feedbackItem);
      await feedback.save();
      res.json(feedback);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @rute GET api/feedback
// @desc Get all feedback
// @access Publc

router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute Delete api/feedback/:id
// @desc Delete  an item
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    const feedback = await Feedback.findOneAndRemove({ _id: req.params.id });

    // res.json(feedback);
    res.json({ msg: "item deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

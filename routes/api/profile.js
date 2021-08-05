const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @rute GET api/Profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute Post api/Profile/me
// @desc Create or update profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("gender", "Gender is required").not().isEmpty(),
      check("dob", "Date of birth is required").not().isEmpty(),
      check("blood", "Blood group is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
      check("phone", "Phone number is required").not().isEmpty(),
      check("aadhar", "Aadhar number is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { gender, dob, blood, address, phone, aadhar } = req.body;
    const user = req.user.id;
    //Build profile object
    const profileFeilds = { user, gender, dob, blood, address, phone, aadhar };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFeilds);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @rute GET api/Profile
// @desc Get all profile
// @access Publc

router.get("/",auth, async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute GET api/Profile/user/:user_id
// @desc Get  profile by user ID
// @access Publc

router.get("/user/:user_id",auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Menu = require("../../models/Menu");
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
      check("title", "Title is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("img", "Image is required").not().isEmpty(),
      check("desc", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { title, category, price, img, desc } = req.body;

    //Build profile object
    const menuItems = { title, category, price, img, desc };

    try {
      let menu = await Menu.findOne({ title });
      if (menu) {
        //update
        menu = await Menu.findOneAndUpdate(
          { title },
          { $set: menuItems },
          { new: true }
        );
        return res.json(menu);
      }
      //create
      menu = new Menu(menuItems);
      await menu.save();
      res.json(menu);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @rute GET api/menu
// @desc Get all menu
// @access Publc

router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @rute GET api/Menu/:category
// @desc Get  Menu by category
// @access Publc

router.get("/:category", async (req, res) => {
  try {
    const menu = await Menu.find({
      category: req.params.category,
    });
    if (!menu) return res.status(400).json({ msg: "Menu not found" });

    res.json(menu);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Menu not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @rute Delete api/menu/:id
// @desc Delete  an item
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    const menu = await Menu.findOneAndRemove({ _id: req.params.id });

    // res.json(menu);
    res.json({ msg: "item deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

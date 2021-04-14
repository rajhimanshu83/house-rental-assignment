var express = require("express");
var router = express.Router();
var House = require("../models/house");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    // Get All Houses
    var houses = await House.find();
    return res.status(200).json(houses);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post("/add", async function (req, res, next) {
  const { title, description, owner, address } = req.body;
  if (title && description && owner && address) {
    try {
      var house = new House({
        title,
        description,
        owner,
        address,
      });
      // Create new House
      var housecreated = await house.save();
      return res.status(200).json(housecreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    res.status(422).send("data_incomplete");
  }
});

module.exports = router;

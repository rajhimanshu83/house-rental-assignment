var express = require("express");
var router = express.Router();
var Owner = require("../models/owner");

/* GET home page. */
router.post("/add", async function (req, res, next) {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    try {
      var owner = new Owner({
        name,
        email,
        phone,
      });
      var ownercreated = await owner.save();
      return res.status(200).json(ownercreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    res.status(422).send("data_incomplete");
  }
});

module.exports = router;

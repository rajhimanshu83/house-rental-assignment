var express = require('express');
var router = express.Router();
var Realtor =  require('../models/realtor');

/* GET home page. */
router.post('/add', async function(req, res, next) {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
        try {
          var realtor = new Realtor({
            name,
            email,
            phone
          });
          // Create new realtor
          var realtorcreated = await realtor.save();
          return res.status(200).json(realtorcreated);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      } else {
        res.status(422).send('data_incomplete');
      }
});

module.exports = router;

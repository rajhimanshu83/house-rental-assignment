var express = require('express');
var router = express.Router();
var Slot =  require('../models/slot');
var Visitation =  require('../models/visitation');
var House =  require('../models/house');

const moment = require('moment');
/* GET home page. */

router.get('/:sid', async function(req, res, next) {
  const { sid } = req.params;
  if (sid) {
      try {
        var slot= await Slot.findOne({_id:sid});
        if(slot) {
          var propertyDetails = await House.findOne({_id:slot.propertyId});
        }
        return res.status(200).json({slot,propertyDetails});
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } else {
      res.status(422).send('data_incomplete');
    }
});

router.get('/:hid/:sdate', async function(req, res, next) {
  const { hid, sdate } = req.params;
  if(hid && sdate) {
    const date = moment(sdate); // Thursday Feb 2015
    const dow = date.day();
    let availableSlots = await Slot.find({dayOfWeek:dow, propertyId: hid});
    const propertyDetails = await House.findOne({_id:hid});
    const alreadyBookedSlots = await Visitation.find({properyId:hid,visitDate: date});
    if(alreadyBookedSlots.length === availableSlots){
      return res.status(200).json({availableSlots:[],propertyDetails});
    }
    let bookedSlotsArr = alreadyBookedSlots.map(s => s.slot);
    availableSlots = availableSlots.filter(s => bookedSlotsArr.indexOf(s._id) === -1 )
    return res.status(200).json({availableSlots,propertyDetails});
  } else {
    res.status(422).json({error:{message:["Invalid HouseId or Slot date"]}});
  }

});


router.post('/add', async function(req, res, next) {
    const { duration, dayOfWeek, status,propertyId,startTime } = req.body;
    if (duration && status && propertyId && startTime) {
        try {
          var slot = new Slot({
            duration,
            dayOfWeek,
            status,
            propertyId,
            startTime,
          });
          // Create new Slot
          var slotcreated = await slot.save();
          return res.status(200).json(slotcreated);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      } else {
        res.status(422).send('data_incomplete');
      }
});

module.exports = router;

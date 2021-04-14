var express = require("express");
var router = express.Router();
var Slot = require("../models/slot");
var Visitation = require("../models/visitation");
var House = require("../models/house");
var Realtor = require("../models/realtor");
var sgMail = require("@sendgrid/mail");

const moment = require("moment");

sgMail.setApiKey(
  "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"
);
/* GET home page. */

router.get("/:vid", async function (req, res, next) {
  const { vid } = req.params;
  const visitation = await Visitation.findOne({ _id: vid });
  if (visitation) {
    const property = await House.findOne({ _id: visitation.propertyId });
    const slot = await Slot.findOne({ _id: visitation.slot });
    const realtor = await Realtor.findOne({ _id: visitation.realtor });
    return res.status(200).json({ visitation, property, slot, realtor });
  }
});

router.post("/add", async function (req, res, next) {
  const { data } = req.body;
  if (data) {
    try {
      const visitationExist = await Visitation.findOne({
        email: data.email,
        slot: data.slot,
        visitDate: data.visitDate,
      });
      if (visitationExist) {
        return res
          .status(203)
          .json({ done: false, message: "Slot is already booked by user " });
      }
      const availableRealtor = await Realtor.find({
        visitations: {
          $not: {
            $elemMatch: {
              date: data.visitDate,
              slot: data.slot,
            },
          },
        },
      });
      if (availableRealtor.length === 0) {
        return res
          .status(203)
          .json({ done: false, message: "Realtors not available" });
      }

      var newVisitation = new Visitation({
        ...data,
      });

      const assignedRealtor = availableRealtor[0];
      await Realtor.findOneAndUpdate(
        { _id: assignedRealtor._id },
        {
          $push: {
            visitations: {
              date: data.visitDate,
              slot: data.slot,
            },
          },
        }
      );
      newVisitation.realtor = assignedRealtor._id;
      var slotBooked = await newVisitation.save();

      const msgRealtor = {
        to: assignedRealtor.email,
        from: "support@phonedict.com",
        subject: "Slot Booking",
        text: `Hello, ${assignedRealtor.name}`,
        html: `
            <div>
              <p>You are assigned a visitation</p>
              <p><strong>Tenent: </strong> ${slotBooked.name}</p>
              <p><strong>Phone: </strong> ${slotBooked.phone}</p>
              <p><strong>Date: </strong> ${moment(slotBooked.visitDate).format(
                "YYYY-MM-DD"
              )}</p>
              <p>Please follow <a href="https://dashboard.seeshop.in/verify-email/">this link</a> to view booking details.</p>
            </div>
            `,
      };

      const msgTenant = {
        to: slotBooked.email,
        from: "support@phonedict.com",
        subject: "Slot Booking",
        text: `Hello, ${slotBooked.name}`,
        html: `
            <div>
              <p>Slot Booking Successful</p>
              <p><strong>Tenent: </strong> ${slotBooked.name}</p>
              <p><strong>Phone: </strong> ${slotBooked.phone}</p>
              <p><strong>Date: </strong> ${moment(slotBooked.visitDate).format(
                "YYYY-MM-DD"
              )}</p>
              <p>Please follow <a href="https://dashboard.seeshop.in/verify-email/">this link</a> to view booking details.</p>
            </div>
            `,
      };
      await sgMail.send(msgRealtor);
      await sgMail.send(msgTenant);
      return res.status(200).json({ done: true, slotBooked });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    res.status(422).send("data_incomplete");
  }
});

module.exports = router;

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitation = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  realtor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Realtor",
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  visitDate: {
    type: Date,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
},
},
{ timestamps: true }
);

mongoose.models = {};

var Visitation = mongoose.model('Visitation', visitation);

module.exports = Visitation;
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var slot = new Schema({
  duration: {
    type: Number,
    required: true
  },
  dayOfWeek: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  realtor: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  startTime: {
    type: String,
  }
},
{ timestamps: true }
);

mongoose.models = {};

var Slot = mongoose.model('Slot', slot);

module.exports = Slot;
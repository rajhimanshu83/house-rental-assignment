const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var realtor = new Schema({
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
  visitations: {
    type: [Object],
  },
},
{ timestamps: true }
);

mongoose.models = {};

var Realtor = mongoose.model('Realtor', realtor);

module.exports = Realtor;
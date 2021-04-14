const mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var owner = new Schema({
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
});

mongoose.models = {};

var Owner = mongoose.model('Owner', owner);

module.exports = Owner;
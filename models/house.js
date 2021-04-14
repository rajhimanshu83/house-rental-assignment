const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var house = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
  },

});

mongoose.models = {};

var House = mongoose.model('House', house);

module.exports =  House;
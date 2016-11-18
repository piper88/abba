'use strict';

const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  name: {type: String},
  caption: {type: String},
  imageURI: {type: String, required: true},
  objectKey: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('photo', photoSchema);

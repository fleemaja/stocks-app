'use strict';

var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  name: String,
  code: String
});

module.exports = mongoose.model('Stock', StockSchema);
'use strict';

var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  name: String,
  code: { type : String , unique : true, required : true, dropDups: true }
});

module.exports = mongoose.model('Stock', StockSchema);
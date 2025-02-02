'use strict';

var Stock = require('../models/stocks.js');
var path = process.cwd();

exports.index = function(req, res) {
  Stock.find(function (err, stocks) {
    if(err) { return handleError(res, err); }
    res.render(path + "/client/index.ejs", {
        stocks: stocks
    });;
  });
};

exports.create = function(req, res) {
    var stock = new Stock();
    stock.name = req.body.name;
    stock.code = req.body.code;
    
    stock.save(function(err) {
      if (err) { return handleError(res, err)};
      return stock;
    });
};

exports.destroy = function(req, res) {
  var code = req.body.code;
  Stock.remove({ code: code }, function (err, stock) {
    if(err) { return handleError(res, err); }
    if(!stock) { return res.status(404).send('Not Found'); }
    return stock;
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
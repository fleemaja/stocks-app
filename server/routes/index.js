'use strict';

var path = process.cwd();
var StockController = require("../controllers/stocks.js");

module.exports = function (app) {
    
    app.route('/')
       .get(function(req, res) {
           StockController.index(req, res);
       })
       .post(function(req, res) {
           StockController.create(req, res);
       })
       .delete(function(req, res) {
           StockController.destroy(req, res);
       });
       
    
    
}
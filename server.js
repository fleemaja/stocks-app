'use strict';

var express = require('express');
var routes = require('./server/routes/index.js');
var mongoose = require('mongoose');

var app = express();
require('dotenv').load();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI);

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

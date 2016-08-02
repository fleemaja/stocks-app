'use strict';

var express = require('express');
var routes = require('./server/routes/index.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var socket = require('socket.io');

var app = express();
app.use(bodyParser.urlencoded());

require('dotenv').load();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI);

routes(app);

var port = process.env.PORT || 8080;
var server = app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("new connection: " + socket.id);
}

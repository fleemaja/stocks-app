'use strict';

var https = require('https');
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

setInterval(function() {
    https.get("https://limitless-plateau-96400.herokuapp.com/");
}, 300000); // ping every 5 minutes to keep heroku site from 'falling asleep'

var io = socket(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('add',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'add'");
      
        // Send it to all other clients
        socket.broadcast.emit('add', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    
    socket.on('remove',
      function(data) {
          console.log("Received: 'remove'");
          socket.broadcast.emit('remove', data);
      }
    )
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);

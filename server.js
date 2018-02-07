console.log("Casa Musical Server is Running");

var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('Socket:', socket.id);
  socket.on('mouse', mouseMessage);

  function mouseMessage(data){
    // console.log('server: ', data);
    // socket.broadcast.emit('mouse',data);
    io.sockets.emit('mouse',data);
  }
}

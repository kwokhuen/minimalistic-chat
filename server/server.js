const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public/');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Connected to client.');

  socket.emit('newMessage', {
    from: 'benjamin',
    text: 'whats up guys',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client was disconnected.');
  });

});

server.listen(port, () => {
  console.log(`Server is up and running on PORT ${port}...`);
});

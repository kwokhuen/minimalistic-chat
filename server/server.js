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
    from: 'Admin',
    text: 'Welcome to the chatroom.',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined the chat room.',
    createdAt: new Date().getTime()
  })


  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client was disconnected.');
  });

});

server.listen(port, () => {
  console.log(`Server is up and running on PORT ${port}...`);
});

var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log('New Message', message);
  var div = $('<div class="chat__each_message"></div>')
  var li = $('<li></li>');
  li.append(`<p class="comment-user">${message.from}</p>`);
  li.append(`<p class="comment-text">${message.text}</p>`);
  div.append(li);
  $('#messages').append(div);
});

socket.on('newLocationMessage', function(message) {
  console.log('New Location Message', message);
  var div = $('<div class="chat__each_message"></div>')
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  a.attr('href', message.url);
  li.append(`<p class="comment-user">${message.from}</p>`);
  $(`<p class="comment-user"></p>`).append(a).appendTo(li);
  div.append(li)
  $('#messages').append(div);
});


$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});

var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var div1 = $('<div class="chat__each_message animated fadeInUp"></div>');
  var div2 = $('<div class="chat__body_container"></div>');
  var p1 = $('<p class="comment-user"></p>');
  var p2 = $('<p class="comment-text"></p>');
  var p3 = $('<p class="comment-timestamp"></p>');
  var li = $('<li></li>');
  p1.text(message.from);
  p2.text(message.text);
  p3.text(formattedTime);
  div2.append(p2).append(p3);
  li.append(p1).append(div2);
  div1.append(li);
  $('#messages').append(div1);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var div = $('<div class="chat__each_message animated fadeInUp"></div>');
  var li = $('<li></li>');
  var p1 = $('<p class="comment-user"></p>');
  var p2 = $('<p class="comment-text"></p>');
  var p3 = $('<p class="comment-timestamp"></p>');
  var a = $('<a target="_blank">My current location</a>');
  a.attr('href', message.url);
  p1.text(message.from);
  p2.append(a);
  p3.text(formattedTime);
  li.append(p1).append(p2).append(p3);
  div.append(li);
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

  locationButton.addClass('animated infinite pulse').attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').removeClass('animated infinite pulse').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').removeClass('animated infinite pulse').text('Send Location');
    alert('Unable to fetch location');
  });
});

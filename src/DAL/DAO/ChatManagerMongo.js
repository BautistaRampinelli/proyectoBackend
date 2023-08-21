const socket = io();

document.getElementById('messageForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let user = document.getElementById('user').value;
  let message = document.getElementById('message').value;
  socket.emit('chat message', { user, message });
  document.getElementById('message').value = ''; 
});

socket.on('chat message', (msg) => {
  let item = document.createElement('li');
  item.textContent = `${msg.user}: ${msg.message}`;
  document.getElementById('messages').appendChild(item);
});

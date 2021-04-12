const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/newIndex', (req, res) => {
  res.sendFile(__dirname + '/newIndex.html');
});

app.get('/thirdIndex', (req, res) => {
  res.sendFile(__dirname + '/thirdIndex.html');
});

io.on('connection', (socket) => {
  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg);
  // });
  socket.on('room', function(room) {
    socket.join(room);
    console.log('connected to: ' + room);
  // io.sockets.in(room).emit('message', 'what is going on, party people?');
    // io.sockets.in(room).emit('message', 'what is going on, party people?');
  });

  socket.on('chat message', (data) => {
    console.log(data);
    io.sockets.in(data.room).emit('chat message', data.msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
})
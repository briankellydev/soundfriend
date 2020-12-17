const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const http = require('http');
const port = process.env.PORT || 4200;
const server = http.createServer(app).listen(port);
const io = require('socket.io')(server);


app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

//use users route for api/users
// app.use('/api/users', usersRoute);

app.get('*', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname}); // load our public/index.html file
});

let totalUsers = 0;

io.on('connection', (socket) => {
  console.log('socket connected');
    totalUsers += 1;
    socket.emit('userChange', totalUsers);
    socket.broadcast.emit('userChange', totalUsers);
  socket.on('playSong', (song) => {
    console.log('playing');
    socket.broadcast.emit('play', song);
    socket.emit('play', song);
  });
  socket.on('stopSong', () => {
    console.log('music stopped');
    socket.broadcast.emit('stop');
    socket.emit('stop');
  });
  socket.on('changeVolume', (val) => {
    console.log('changing volume');
    socket.emit('volume', val);
    socket.broadcast.emit('volume', val);
  });
  socket.on('disconnect', () => {//when someone logs out
    console.log('socket disconnected')
    totalUsers -= 1;
    socket.emit('isAdmin', totalUsers === 1);
    socket.broadcast.emit('userChange', totalUsers);
    socket.emit('userChange', totalUsers);
  });
});
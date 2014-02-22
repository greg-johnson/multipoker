
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var poker = require('./node-poker/lib/node-poker');

var app = express();

var table = new poker.Table(50,100,2,10,100,1000);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
	
app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);



io.sockets.on('connection', function (socket) {
  table.AddPlayer('Player Name', 1000);
   
  socket.emit('player-connected', { playerNumber:table.players.length });

  socket.on('chat-send', function (data) {
    socket.broadcast.emit('chat-receive', {name: data.name, message:data.message});
  });

  socket.on('game-start', function() {
  	table.StartGame();
	socket.emit('player-details', {}); //asks for player numbers
	socket.broadcast.emit('player-details', {}); //asks for player numbers
  });
  
  socket.on('player-number', function(data){
	  var pn = data.number - 1; //because arrays are stupid
	  var playerHand = table.players[pn].cards;
	  socket.emit('player-hand', {hand: playerHand});
  });

  
  
  
});

/*
 * GET multiplayer page.
 */

exports.multiplayer = function(req, res){

	var server = http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
	
	var poker = require('./node-poker/lib/node-poker');
	var table = new poker.Table(50,100,2,10,100,1000);
	
	var io = require('socket.io').listen(server);
	
	io.sockets.on('connection', function (socket) {
	  
	  //when users connect, add players to the game
	  table.AddPlayer('Player Name', 1000);
	  playerNumber = table.players.length - 1;
	  socket.emit('player-connected', { playerNumber:playerNumber });
			
	  socket.on('game-start', function() {
	  if (table.players.length >= 2){
	  	table.StartGame();
			socket.emit('player-details', { start: true }); //asks for player numbers
			socket.broadcast.emit('player-details', { start: true }); //asks for player numbers
	  }else{
		  socket.broadcast.emit('player-details', {});
		  socket.emit('player-details', {players: table.players.length});
	  }
	  });
	  
	  socket.on('player-number', function(data){
		  var playerHand = table.players[data.number].cards;
		  var playerChips = table.players[data.number].chips;
		  socket.emit('player-hand', {hand: playerHand, chips: playerChips });
	  });
	  
	  
	  socket.on('called', function(data){
	  	table.players[data.number].Call();
	  	var board = table.game.board;
		  socket.broadcast.emit('player-called', {number: data.number, board: board});
		  socket.emit('player-called', {board: board});
	  });
	  
		// Chat
	  socket.on('chat-send', function (data) {
	    socket.broadcast.emit('chat-receive', {name: data.name, message:data.message});
	  });
	  
	});

  res.render('host', { title: 'Host a Game' });
};
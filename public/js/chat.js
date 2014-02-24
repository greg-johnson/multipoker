var playerNumber = null,
		socket = io.connect('http://192.168.1.195:3000'),
		board = null,
		hand = null,
		chips = null;
		






//**** Game ****//

// Player Connected
socket.on('player-connected', function (data) {
	playerNumber = data.playerNumber; // store the player number
	console.log('I am player number: ' + playerNumber); 
});

// Start Game
document.getElementById("game-start").addEventListener("click",
	function(event) {
		socket.emit('game-start', {});
});







socket.on('player-details', function (data) {
	if (data.start){
		console.log("The game has started");
		socket.emit('player-number', {number: playerNumber}); //send back the player number
	}else{
		console.log("You need at least 2 players, you have: " + data.players);
	}
});

socket.on('player-hand', function (data) {
	hand = data.hand;
	chips = data.chips;
	console.log('Hand: ' + hand );
	console.log('Chips: ' + chips);
});







//**** Player Moves ****//

// Call
document.getElementById("call").addEventListener("click",
	function(event) {
		console.log("You have just called");
		socket.emit("called", {number: playerNumber});
});

socket.on("player-called", function(data){
	board = data.board;
	if (data.number){ 
		console.log("Player " + playerNumber + " has called."); //tells other players this player has called
	}
	if (board){
		console.log("Board: " + board); //updates the board for all players
	}
});


// Bet
// Fold
// Check








//**** Chat ****//

// Send 
document.getElementById("chat-send").addEventListener("click",
	function(event) {
		var name = document.getElementById('chat-name').value;
		var message = document.getElementById('chat-message').value;
		socket.emit('chat-send', {name:name, message:message});
});

// Recieve
socket.on('chat-receive', function (data) {
	console.log(data.name + " says '"+data.message+"'")
});






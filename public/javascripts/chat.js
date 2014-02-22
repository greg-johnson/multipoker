var playerNumber = null;


var socket = io.connect('http://192.168.1.195:3000');
socket.on('chat-receive', function (data) {
	console.log(data.name + " says '"+data.message+"'")
});

socket.on('player-connected', function (data) {
	console.log('I am player number: ' + data.playerNumber); 
	playerNumber = data.playerNumber; //store the player number
});

socket.on('player-details', function () {
	socket.emit('player-number', {number: playerNumber}); //send back the player number
});

socket.on('player-hand', function (data) {
	console.log('My Hand is: ' + data.hand );
});


document.getElementById("chat-send").addEventListener("click",
	function(event) {
		var name = document.getElementById('chat-name').value;
		var message = document.getElementById('chat-message').value;
		socket.emit('chat-send', {name:name, message:message});
});

document.getElementById("game-start").addEventListener("click",
	function(event) {
		socket.emit('game-start', {});
});
var gameStarted = false;


var socket = io.connect('http://192.168.1.183:3000');
socket.on('chat-receive', function (data) {
	console.log(data.name + " says '"+data.message+"'")
});

socket.on('user-connected', function (data) {
	console.log('Somebody connected to this room!');
});



document.getElementById("chat-send").addEventListener("click",
	function(event) {
		var name = document.getElementById('chat-name').value;
		var message = document.getElementById('chat-message').value;
		socket.emit('chat-send', {name:name, message:message});
});
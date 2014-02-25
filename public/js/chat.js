
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






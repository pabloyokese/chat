module.exports = function (io){

io.sockets.on('connection',function(socket){
	console.log('client connected');
	
	socket.on('set_nickname',function(nickname,callback){
		console.log('Trying to set nickname: ' + nickname);

		var isAvailable = isNicknameAvailable(nickname);

		if(isAvailable)
			socket.nickname = nickname;

		callback(isAvailable);

		sendMessage('SERVER', 'User @' + nickname + ' has connected.');
	});


	socket.on('message',function(message){
		sendMessage(socket.nickname,message);
	});

	socket.on('disconnect',function(){
		console.log('usuario desconectado');
		sendMessage('SERVER', 'User @' + socket.nickname + ' has disconnected.');
	});

});// close connection





var sendMessage = function(nickname,message){
	io.sockets.emit('message',nickname , message);
};

var isNicknameAvailable = function(nickname){
	var clients = io.sockets.clients();

	for (client in clients ){
		if(clients.hasOwnProperty(client)){
			client = clients[client];
			
			console.log(client.nickname);

			if(client.nickname == nickname)
				return false;
		}
	}
	return true;
};	// close isNickNameAvailable

}; // close module exports
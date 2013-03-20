$(function(){
	var $login = $('#login');
	var $chat = $('#chat');
	var $messages = $('#messages');

	var socket = io.connect('/');

	socket.on('connect',function(){
		console.log('connected with socket');
		init();
	});	// connect




	var init = function(){
		$('#nickname').keyup(function(e){
		var code = e.which || e.keyCode;
			if(code == 13){
				setNickname($(this).val());	
			}
		}); // close nickname

		$chat.hide();

	}; // close init

	var setNickname = function(nickname){
		socket.emit('set_nickname', nickname , function(is_available){
			if(is_available){
				console.log('Nick name ' + nickname +  ' is available.');		
				setUpChat(nickname);
			}
			else{
				console.log('Nick name ' + nickname +  ' is not available.');				
			}
		});
	}; // cloase setNickname

	var setUpChat = function(nickname){
		$login.hide();
		$chat.show();

		$('#submit-message').click(function(){
			sendMessage($('#message').val());
			$('#message').val('');
		});

		socket.on('message',function(nickname , message){
			addMessage(nickname , message);
		});
	}; // Close setUpChat

	var sendMessage = function (msg){
		socket.emit('message',msg);
	}; 

	var addMessage = function (nickname, message){
		$messages.append($('<li>@' + nickname +' : '+  message +'</li>'));
	}
});
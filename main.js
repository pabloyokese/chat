var express = require('express');

// First step to create a server create a instance of express
// Express always is the app
var app = express();

// Only the http has the method create server
// we can use express pass app like param
var server = require('http').createServer(app);

// to do use from websocket and only it can heard to http
var io = require('socket.io').listen(server);

// port on
var PORT = 8080;


// Server needs to start to listen
server.listen(PORT, function(){
	console.log('Listening on port: ' + PORT);
});

app.configure(function(){
	app.set('view options',{
		layout: false
	});

	app.use(express.static(__dirname + '/static'));

});

io.configure(function(){
	io.disable('log');
});



// serving my first view with jade
app.get('/',function(request, response){
	response.render('main.jade');
});

require('./io')(io);





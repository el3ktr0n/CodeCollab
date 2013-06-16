
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'));
var io = require('socket.io').listen(server, function(){
	console.log("Express server listening on port"+ app.get('port'));
});

var clients={};

io.sockets.on('connection', function(socket){
	socket.on('ping', function(data){
		console.log('socket: server receives ping');
		socket.emit('pong', data);
		console.log('socket: server sends pong');
	});
	socket.on('updateCode', function(data, session, handle){
		console.log("session "+ session + " drew: ");
		console.log(data);
		//socket.broadcast.emit('updateCode', data);
		io.sockets.socket(clients[handle]).emit('updateCode', data);
	});
	socket.on('changeLanguage', function(lang, session, handle){
		console.log("session "+ session + "changed language to: ");
		console.log(lang);
		//socket.broadcast.emit('changeLanguage', lang);
		io.sockets.socket(clients[handle]).emit('changeLanguage', lang);
	});
	socket.on('changeTheme', function(theme, session, handle){
		console.log("session "+ session + "changed theme to: ");
		console.log(theme);
		//socket.broadcast.emit('changeLanguage', lang);
		io.sockets.socket(clients[handle]).emit('changeTheme', theme);
	});
	socket.on('addUser', function(data, session){
		if(clients[data.handle]!=null){
			console.log("try diffrent username");
			io.sockets.socket(session).emit('usernameAlreadyRegistered', 'Please try different username.');
		}
		else{
			console.log(data);
			clients[data.handle]=session;
		}
	});
	
});

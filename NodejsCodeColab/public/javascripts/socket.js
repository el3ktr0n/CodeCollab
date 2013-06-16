io = io.connect('/');
console.log("socket: browser says ping");
io.emit('ping', {some: 'data'});
io.on('pong', function(data){
	console.log('socket: browser receives pong', data);
	console.log(io.socket.sessionid);
});
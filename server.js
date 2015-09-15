var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var favicon = require('serve-favicon');

var users = 0;
var nPlayersPerGame = [4,3,1,3,3,4];
var pcs = 0;

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req, res){
  res.sendFile('public/index.html');
});

io.on('connection', function(socket){
	
  console.log('a user connected');
	
	socket.emit('number players', nPlayersPerGame);
	
	socket.on('enlist', function(data){
		var email, hasPC, com, drinks, games
		email = data[0][0];
		hasPC = data[1];
		com = data[0][1];
		drinks = data[0][2];
		games = data[2];
		
    console.log(email);
		console.log(hasPC);
		console.log(com);
		console.log(drinks);
		console.log(games);
		
		for (var i = 0; i<6; i++){
			if(games[i] == true){
				nPlayersPerGame[i]++;
			}
		}
		
		users++;
		var user = 'User number '+users+'\n';
		user += 'email: '+email+'\n';
		if(hasPC == true){
			user += 'Has a PC\n';
			pcs++;
			console.log(''+pcs+' PCs available');
		}else{
			user += 'No PC\n';
		}
		if (com !== ''){user += 'Says: '+com+'\n';}
		user += 'Drinks '+drinks+'\n';
		user += 'Games will play: '+games+'\n-------------------\n\n';
		
		fs.appendFile('enlisted.txt', user, function (err) {
			if (err) {
				throw err;
				socket.emit('error', err);
			}else{
				console.log('New user enlisted!');
				socket.emit('enlisted');
			}
		});
  });
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	
});

http.listen(5000, function(){
  console.log('listening on *:3000');
});
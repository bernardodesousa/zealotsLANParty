var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

// app.post('/enlist', function(req, res) {
	// console.log(req.body);
	
	// res.statusCode = 302;
	// res.setHeader("Location", "/index.html");
	// res.end();
// });



app.listen(3000, function() { console.log('listening')});
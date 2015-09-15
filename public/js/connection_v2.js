var socket = io();
var games = [];
var nPlayersPerGame = [3,2,0,2,2,3];

$('form').submit(function(){
	var data, text, hasPC
	
	text = [$('#inputEmail').val(), $('#textArea').val(), $('#inputBeverage').val()];
	console.log(text);
	
	hasPC = document.getElementById('hasPC').checked;
	
	console.log(hasPC);
	
	for (var i=0; i<6; i++){
		var x = document.getElementById('game'+i).checked;
		games[i] = x;
	}
	
	console.log(games);
	
	data = [text, hasPC, games];
	
	socket.emit('enlist', data);
	return false;
});

socket.on('enlisted', function(){
	console.log('Hey! Server says I\m enlisted!');
	
	$('form').slideUp(400, function(){
		$('#done').fadeIn().removeClass('hidden');
	});
	
	for (var i = 0; i<6; i++){
		if(games[i] == true){
			nPlayersPerGame[i]++;
			$('#title'+i).children().remove();
			$('#title'+i).append('<span class="badge">'+nPlayersPerGame[i]+'</span>')
		}
	}
});

socket.on('number players', function(data){
	nPlayersPerGame = data;
	for (var i = 0; i<6; i++){
		$('#title'+i+'>span').remove();
		$('#title'+i).append('<span class="badge">'+nPlayersPerGame[i]+'</span>')
	}
});

socket.on('error', function(data){
	console.log('ERROR. You are not enlisted.');
	console.log(data);
	$('#err').append('<strong>Deu pau: </strong>'+data);
	$('form').slideUp(400, function(){
		$('#err').fadeIn().removeClass('hidden');
	});
});
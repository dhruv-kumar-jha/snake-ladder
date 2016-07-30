'use strict';


var express = require('express');
var app = express();

app.set( 'port', process.env.PORT || 80 );

app.use(express.static('public'));

app.get('/*', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});


app.listen( app.get('port'), function () {
	console.log('Server running at http://localhost:%s', app.get('port'));
});


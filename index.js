var express = require('express'),
	auth = require('basic-auth'),
	expressHbs = require('express-handlebars'),
    port = 9000;

var app = express();

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use(function(req, res, next){

	var credentials = auth(req);

	if(!credentials || credentials.name !== 'test' || credentials.pass !== 't3st') {
		res.writeHead(401, {
			'WWW-Authenticate': 'Basic realm="example"'
		});
		res.end();
	} else {
		app.locals.name = credentials.name;
		next();
	}
});

app.get('/', function(req, res){
  res.render('greeting', { title: 'Simple Greeting App', name: app.locals.name});
});

app.listen(port, function(){
  console.log('listening on port ' + port);
});
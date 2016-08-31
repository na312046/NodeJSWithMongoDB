//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

var nconf = require('nconf');
var express = require('express');
var http = require('http');

var path = require('path');
var app = express();
//var routes = require('./routes');
var user = require('./routes/user');

var bodyParser = require('body-parser')
var abstest = 'test of te';
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

// all environments

app.set('port', process.env.PORT || 3113);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

// tell nconf which config file to use
nconf.env();

nconf.file({ file: 'config.json' });

var url = nconf.get("HOST");
var MongoClient = mongodb.MongoClient;



app.post('/CreateUser',user.Create); 
app.get('/getuser',user.get);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


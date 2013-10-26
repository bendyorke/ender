
/**
 * Module dependencies.
 */

var express  = require('express');
var http     = require('http');
var path     = require('path');
var mongoose = require('mongoose');
var routes   = require('./routes');
var photo    = require('./routes/photo');
var models   = require('./models');
var AWS      = require('aws-sdk');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// mongoose config
var uristring = process.env.MONGOLAB_URI || 
                process.env.MONGOHQ_URL  || 
                'mongodb://localhost/ender'
mongoose.connect(uristring)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connection established')
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/photos/new', photo.new);
app.get('/photos', photo.list);
app.get('/remove', photo.remove);
app.post('/photos/create', photo.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

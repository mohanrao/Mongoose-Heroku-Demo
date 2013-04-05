
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
    , employeeModel = require('./models/employee')
    ,employeeRoute = require('./routes/employee');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uriString =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/HelloMongoose';

mongoose.connect(uriString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('Successfully mongodb is connected');
});

app.get('/employee',employeeRoute.index);
app.get('/employee/:id',employeeRoute.findById);
app.put('/employee/:id',employeeRoute.update);
app.delete('/employee/:id',employeeRoute.delete)
app.post('/employee',employeeRoute.newEmployee);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

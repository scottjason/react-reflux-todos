var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./config/database');
var config = require('./config');

database.connect();

var app = express();

var env = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
app.set('env', env);

var url = (app.get('env') === 'production') ? '' : 'http://localhost:3000'

app.set('views', path.join(config.root, 'server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(config.root, 'dist')));

require('./routes/index')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(config.server.port, function() {
  console.log('Express server started in ' + app.get('env') + ' mode, ' + url);
});

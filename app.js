var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
// var indexRouter = require('./APIs/models/index');
// var usersRouter = require('./APIs/models/user.model');
//var addusersRouter = require('./models/users');

var app = express();

//var cors = require('cors');
// use it before all route definitions
//app.use(cors({origin: 'http://digitaldestino.onsisdev.info'}));
//app.use(cors({origin: 'http://localhost:4000'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  //* will allow from all cross domain
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use('/',require('./APIs/api'));
// view engine setup

app.set('views', path.join(__dirname+'/APIs', 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//app.use('/users/add', addusersRouter);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  //next(createError(404));
  console.log('adada');next();
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
 // res.status(err.status || 4000);
 // res.render('error');
});

module.exports = app;

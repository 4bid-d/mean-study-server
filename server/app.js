var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:3000',
  methods : "GET,HEAD,PUT,PATCH,POST,DELETE"
}
const mongoose = require('mongoose')
var signupRouter = require('./routes/auth/signup');
var indexRouter = require('./routes/data/index');
var usersRouter = require('./routes/data/users');
var loginRouter = require('./routes/auth/login');
var serverRouter = require('./routes/server/server');
var inviteRouter = require("./routes/Invitation/invite")
var app = express();

mongoose.connect('mongodb://localhost:27017/myapp');// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cors(corsOptions), indexRouter);
app.use('/signup', cors(corsOptions), signupRouter);
app.use('/login', cors(corsOptions), loginRouter);
app.use('/user', cors(corsOptions), usersRouter);
app.use('/server', cors(corsOptions), serverRouter);
app.use('/invite', cors(corsOptions), inviteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

app.listen("3001",()=>{
  console.log('Listening on port 3001');
})

module.exports = app;

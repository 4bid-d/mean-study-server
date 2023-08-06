var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()
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
var serverRefRouter = require('./routes/server/serverRef');
var inviteAndRequestRouter = require("./routes/requests/Request")
var newsFeedsRouter = require("./routes/newsfeed/NewsFeed");
const errorHandler = require('./common/Middlewares/errorHandler');
const NotFoundError = require('./common/errors/not-found-error');
const bearerVerification = require('./Middlewares/auth/bearerVerification');
var app = express();

// mongoose.connect(`mongodb+srv://abidpp1212:${process.env.MONGO}@cluster0.coote.mongodb.net/?retryWrites=true&w=majority`);//  view engine setup
mongoose.connect('mongodb://localhost:27017/myapp',()=>console.log('connected'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/user', usersRouter);
app.use('/server',bearerVerification, serverRouter);
app.use('/server-ref', serverRefRouter);
app.use('/request', inviteAndRequestRouter);
app.use('/newsfeed', newsFeedsRouter);

// catch 404 and forward to error handler
app.use("*",function(req, res, next) {
  next(new NotFoundError());
});

// error handler
app.use(errorHandler);

app.listen("3001",()=>{
  console.log('Listening on port 3001');
})

module.exports = app;

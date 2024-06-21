var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

dotenv.config();

var app = express();

//connect to mongodb 
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Passport configuration
require('./config/passport');


const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//production dependencies
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);
app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

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
  res.render('error');
});

module.exports = app;

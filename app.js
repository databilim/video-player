 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
const fileUpload = require('express-fileupload');
var moment = require('moment');
moment.locale("tr");

global.moment = moment;
require('./passport')(passport)

const db = require('./helper/db.js')();

/// MIDLEWARE 
const  video = require("./middleware/video");
const  swarm = require("./middleware/checkin");
const  genelAyarMidle = require("./middleware/genelayar");

/// ROUTER 
var users       = require('./routes/users');
var auth        = require('./routes/auth')(passport);
var genelAyar   = require('./routes/genelAyar');

var swarms = require('./routes/swarm');
var index = require('./routes/index');
var admin = require('./routes/admin');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 //app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'thesecret',
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize())
app.use(passport.session())




app.use(swarm); 
app.use(genelAyarMidle)

app.use('/users', users);
app.use('/auth', auth)
app.use('/', index);
app.use("/",video); 
app.use("/social",swarms);
app.use("/genelAyar",genelAyar);
app.use("/admin",admin);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); 
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
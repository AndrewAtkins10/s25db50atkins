require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
  let reseed = true;
  if (reseed) { recreateDB(); }
});

var Costume = require("./models/costume");

async function recreateDB(){
    try {
        await Costume.deleteMany();
        let instance1 = new Costume({costume_type:"ghost", size:'large', cost:15.4});
        instance1.save().then(doc => {
            console.log("First object saved");
        }).catch(err => {
            console.error(err);
        });
    } catch (err) {
        console.error("Seed error:", err);
    }
}

var pickRouter = require('./routes/pick');
var costumesRouter = require('./routes/costumes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/costumes', costumesRouter);
app.use('/resource', resourceRouter);
app.use('/selector', pickRouter);

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//server.js
//we get tools 
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect database

// set application express
app.use(morgan('dev')); //log req to the console
app.use(cookieParser()); //read cookies( auth) 
app.use(bodyParser()); //get info html

app.set('view engine','ejs'); // set templates

//set for passport
app.use(session({
				secret: process.env.SECRET_MODULUS,
				resave: true,
				saveUninitialized: true
				}));  // session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes.js').(app,passport); //load routes and pass app in passport

app.listen(port);
console.log('server is connected in localhost:3000 ' + port);
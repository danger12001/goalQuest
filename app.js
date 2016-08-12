var express = require('express'),
handlebars = require('express-handlebars'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
bcrypt = require('bcryptjs'),
session = require('express-session'),
flash = require('express-flash'),
fs = require("fs"),
app = express();


//initial setup
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static("public"));
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err,
    admin: req.session.admintab,
    user: req.session.username
  });
}
app.use(session({
  secret: 'space cats on synthesizers',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// =============================================================================
//Routes
app.get('/', function(req,res){
  res.render('home');
});
app.get('/goals', function(req,res){
  res.render('goals');
});
app.get('/profile', function(req,res){
  res.render('profile');
});
app.get('/budget', function(req,res){
  res.render('budget');
});
app.get('/todo', function(req,res){
  res.render('toDo');
});






//==============================================================================
app.use(errorHandler);

//server Starter
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Goal Quest app listening at http://%s:%s', host, port);

});

var express = require('express'),
handlebars = require('express-handlebars'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
myConnection = require('express-myconnection'),
bcrypt = require('bcryptjs'),
session = require('express-session'),
flash = require('express-flash'),
fs = require("fs"),
setup = require('./database/setup');

app = express();

var signup = require('./routes/signup'),
    todo = require('./routes/toDo');
    login = require('./routes/login');

//initial setup
app.use(bodyParser.urlencoded({
  extended: false
}));
 // app.use(express.bodyParser());
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
setup();
// =============================================================================
//db connection
var dbOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '5550121a',
  port: 3306,
  database: "goalQuest"
};
// var connection = mysql.createConnection(dbOptions);
app.use(myConnection(mysql, dbOptions, 'single'));
//==============================================================================
//middleware
app.use(function(req, res, next) {
  if (req.path != "/login" && req.path != "/signup") {
      if (!req.session.username) {
        return res.redirect("/login");
    }
  }
  next();
});







// =============================================================================
//Routes
app.get('/', function(req,res){
  res.render('home', {user: req.session.username, admin: req.session.admintab});
});

app.get('/signup', function(req,res){
  res.render('signup',{user: req.session.username, admin: req.session.admintab});
});
app.post('/signup', signup);
app.get('/login', function(req,res){
  res.render('login',{user: req.session.username, admin: req.session.admintab});
});
app.post('/login', login);
app.get("/logout", function(req, res, next) {
  delete req.session.username;
  delete req.session.admintab;
  res.redirect("/login");
});

app.get('/goals', function(req,res){
  res.render('goals',{user: req.session.username, admin: req.session.admintab});
});
app.get('/profile', function(req,res){
  res.render('profile',{user: req.session.username, admin: req.session.admintab});
});
app.get('/budget', function(req,res){
  res.render('budget',{user: req.session.username, admin: req.session.admintab});
});
app.get('/todo', function(req,res){
  res.render('toDo',{user: req.session.username, admin: req.session.admintab, data: todo.get});
});
app.post('/todo', todo.post);






//==============================================================================
app.use(errorHandler);

//server Starter
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Goal Quest app listening at http://%s:%s', host, port);

});

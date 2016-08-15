var mysql = require('mysql');
var fs = require("fs");
module.exports = function(){

var dbOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '5550121a',
  port: 3306,
  database: "goalQuest"
};

var CreateDB = String(fs.readFileSync('./database/sql/setup.sql'));
var users = String(fs.readFileSync('./database/sql/users.sql'));
var toDolist = String(fs.readFileSync('./database/sql/toDolist.sql'));
var connection = mysql.createConnection(dbOptions);

connection.query(CreateDB, [], function(err, result) {
  if (err) throw err;
  connection.query(users, [], function(err, result){
    if(err) throw err;
    connection.query(toDolist, [], function(err, result){
      if(err) throw err;
  });
});
});
};

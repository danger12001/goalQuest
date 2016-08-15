var mysql = require('mysql');
var dbOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '5550121a',
  port: 3306,
  database: "goalQuest"
};

var connection = mysql.createConnection(dbOptions);

exports.get = function(req, res){
  req.getConnection(function(err, connection) {
    var user = req.session.username;
      // if (err)
          // return next(err);
          console.log("user",user);

connection.query('select * from toDo,users where ? = users.username',user,function(err, result){
if(err) throw err;


console.log(result);
return result;
});
});
};
exports.post = function(req, res){

};

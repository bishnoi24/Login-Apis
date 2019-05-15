var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  user     : 'appdbadmin',
  password : '',
  database : ''
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
// module.exports = {
//     'secret': 'supersecret',
//     'connection': connection
// };
module.exports = connection;

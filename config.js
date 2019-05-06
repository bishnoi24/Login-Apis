var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sportsstattracker.cbdjliwubxqe.us-east-1.rds.amazonaws.com',
  user     : 'appdbadmin',
  password : 'PW4Sp0rtStaTrackerAppBy0NS',
  database : 'db_customapp'
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
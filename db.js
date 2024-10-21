var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "rootcl",
  password: "belinda98"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
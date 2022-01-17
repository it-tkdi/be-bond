const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-bond"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("V DB is up and running.");
});

module.exports = db
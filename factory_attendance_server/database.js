const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "factory_db",
    port: 3307
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected To MySQL");
    }
});

module.exports = connection;
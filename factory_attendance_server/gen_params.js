const mysql = require("mysql2");
const { HOST, USER, PASSWORD, DATABASE } = require("./gen_params");

let pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: 3307,
    waitForConnections: true,
    connectionLimit: 25
});

module.exports = pool;
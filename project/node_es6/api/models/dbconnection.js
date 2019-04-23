'user strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'node_api',
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected MySQL server as id:  ' + connection.threadId);
});

module.exports = connection;
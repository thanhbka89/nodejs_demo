'user strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'node_api',
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('connected MySQL as id ' + connection.threadId);
});

module.exports = connection;
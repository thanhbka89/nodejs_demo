const mysql = require('mysql');

const conn = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'node_api'
});
//kết nối.
conn.connect(function (err){
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    console.log('MySQL connected successfully');
    
});
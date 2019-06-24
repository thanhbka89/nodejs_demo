const mysql = require('mysql')
import CONFIG from '../../config/config'


const connection = mysql.createConnection(CONFIG.mysql)

connection.connect(function (err) {
    if (err) throw err

    console.log('Connected MySQL server as id:  ' + connection.threadId)
});

module.exports = connection

// export default connection
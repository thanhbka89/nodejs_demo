'user strict';
var sql = require('./dbconnection');

const User = function(user){
    this.username = user.username;
};

User.getById = function getUser(uID, result) {
    sql.query("Select * from users where id = ? ", uID,  (err, res) => {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);    
        }
    });   
};

export default User
'user strict';
var sql = require('./dbconnection');

const Product = function(product){
    this.name = product.name;
};

Product.getById = function getProduct(prdId, result) {
    sql.query("Select * from products where id = ? ", prdId,  (err, res) => {             
            if(err) {
                result(err, null);
            }
            else{
                result(null, res);    
            }
        });   
};

export default Product;
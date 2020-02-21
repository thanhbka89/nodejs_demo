SQL Terms/Concepts 	                                MongoDB Terms/Concepts
==============================================================
database 	                                        database
table 	                                            collection
row 	                                            document or BSON document
column 	                                            field
index 	                                            index
table joins 	                                    mbedded documents and linking

primary key                                         primary key
Specify any unique column or                        In MongoDB, the primary key is automatically set to the _id field
column combination as primary key.
	


SQL Statement                                       Mongo Statement
=========================================================

INSERT INTO USERS VALUES(3,5)                       db.users.insert({a:3,b:5})
SELECT a,b FROM users	                            db.users.find({}, {a:1,b:1})
SELECT * FROM users	                                db.users.find()
SELECT * FROM users WHERE age=33	                db.users.find({age:33})
SELECT a,b FROM users WHERE age=33	                db.users.find({age:33}, {a:1,b:1})
SELECT * FROM users WHERE age=33 ORDER BY name	    db.users.find({age:33}).sort({name:1})
SELECT * FROM users WHERE age>33	                db.users.find({age:{$gt:33}})
SELECT * FROM users WHERE age!=33	                db.users.find({age:{$ne:33}})
SELECT * FROM users WHERE name LIKE “%Joe%”	        db.users.find({name:/Joe/})
SELECT * FROM users WHERE name LIKE “Joe%”	        db.users.find({name:/^Joe/})
SELECT * FROM users WHERE age>33 AND age<=40	    db.users.find({‘age’:{$gt:33,$lte:40}})
SELECT * FROM users ORDER BY name DESC	            db.users.find().sort({name:-1})
SELECT * FROM users WHERE a=1 and b=’q’	            db.users.find({a:1,b:’q’})
SELECT * FROM users LIMIT 10 SKIP 20	            db.users.find().limit(10).skip(20)
SELECT * FROM users WHERE a=1 or b=2	            db.users.find( { $or : [ {a:1} , {b:2} ] } )
SELECT * FROM users LIMIT 1	                        db.users.findOne() or db.users.find().limit(1)

SELECT order_id FROM orders o, order_line_items li
WHERE li.order_id=o.order_id AND li.sku=12345	    db.orders.find({“items.sku”:12345},{_id:1})

SELECT customer.name FROM customers,orders          var o = db.orders.findOne({_id:”q179″})
WHERE orders.id = “q179”                            var name = db.customers.findOne({_id:o.custid})
AND orders.custid = customer.id	                    
                                                    
SELECT DISTINCT last_name FROM users	            db.users.distinct(‘last_name’)
SELECT COUNT(*)FROM users	                        db.users.count() or db.users.find().count()
SELECT COUNT(*)FROM users where AGE > 30	        db.users.find({age: {‘$gt’: 30}}).count()
SELECT COUNT(AGE) from users	                    db.users.find({age: {‘$exists’: true}}).count()

CREATE INDEX myindexname ON users(name)	            db.users.ensureIndex({name:1})
CREATE INDEX myindexname ON users(name,ts DESC)	    db.users.ensureIndex({name:1,ts:-1})

EXPLAIN SELECT * FROM users WHERE z=3	            db.users.find({z:3}).explain()

UPDATE users SET a=1 WHERE b=’q’	                db.users.update({b:’q’},{$set:{a:1}},false,true)
UPDATE users SET a=a+2 WHERE b=’q’	                db.users.update({b:’q’},{$inc:{a:2}},false,true)

DELETE FROM users WHERE z=”abc”	                    db.users.remove({z:’abc’})
DELETE FROM users                                   db.users.remove( )

DROP TABLE users                                    db.users.drop()


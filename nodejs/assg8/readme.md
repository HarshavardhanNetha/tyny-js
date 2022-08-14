db.products.insert({"name":"TShirtOne","size":"xl","color":"red","price":1000})
db.products.insertMany([{"name":"TShirtTwo","size":"xxl","color":"black","price":2000},{"name":"TShirtThree","size":"l","color":"pink","price":1500},{"name":"TShirtFour","size":"s","color":"white","price":500}])
db.products.textiles.insert({"name":"TShirtOne","size":"xl","color":"red","price":1000})
db.products.textiles.insertMany([{"name":"TShirtTwo","size":"xxl","color":"black","price":2000},{"name":"TShirtThree","size":"l","color":"pink","price":1500},{"name":"TShirtFour","size":"s","color":"white","price":500}])
db.products.electronics.insertMany([{"name":"TVOne","size":"xxl","color":"black","price":5000},{"name":"TVTwo","size":"l","color":"pink","price":8500},{"name":"TVThree","size":"s","color":"white","price":1000}])
db.products.textiles.find({"color":"white"})
db.products.textiles.find({$and:[{"color":"white"},{"size":"s"}]})
db.products.find({$in:[db.products.find()]}) -> Cyclic Dependency Detected

https://sqlserverguides.com/mongodb-nested-query/
https://www.mongodb.com/docs/manual/reference/operator/query/and/


 db.products.aggregate([{$group: {"_id":"$price","name": {$push: "$name"},"color": {$push: "$color"}}}])
 
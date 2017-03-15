"use strict";

const fs = require("fs"),
path = require("path"),
Sequelize = require("sequelize"),
env = process.env.NODE_ENV || "development",
config = require(__dirname + '/../config/mysql.json')[env],
basename  = path.basename(module.filename),
sequelize = new Sequelize(config.database, config.username, config.password, config.options);

let db = {};

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

//Load all the models
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function(file) {
    //console.log(path.join(__dirname, file));
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});


Object.keys(db).forEach(function(modelName) {//console.log(modelName);
    //if ("associate" in db[modelName]) {
    if (db[modelName].associate) {
        //console.log(modelName);
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

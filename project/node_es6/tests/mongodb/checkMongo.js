"use strict";

//console.log(global);

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/local", { useNewUrlParser: true });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("we're connected!");
// });

let mongoose = require("mongoose");
const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
const database = "api_node"; // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    // Remove the warning with Promise
    mongoose.Promise = global.Promise;

    mongoose
      .connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}

new Database();

module.exports = new Database()

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _configs = _interopRequireWildcard(require("./configs"));

var _index = _interopRequireDefault(require("./routes/index"));

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
var node_env = process.env.NODE_ENV || 'development';
console.log(_configs["default"], _configs.mysql);
console.log(process.env.MY_SECRET); //routes

// middleware
app.use((0, _express.json)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: false
}));
app.use((0, _cors["default"])());
app.use(function (req, res, next) {
  console.log('Request Received: ', Date.now());
  next();
});
app.get('/', function (req, res) {
  return res.json({
    msg: 'Hello World!'
  });
});
app.use('/api/v1', _index["default"]);
app.use(function (req, res, next) {
  var err = new Error("".concat(req.method, " ").concat(req.url, " Not Found"));
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    msg: err.message
  });
});
app.listen(port, function () {
  return console.log("[".concat(new Date(), "] Example app listening on port ").concat(port, "!"));
});
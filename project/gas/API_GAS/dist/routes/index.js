"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router(); // Get all subscribers

router.get('/',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              res.status(200).json({
                msg: 'API Home!'
              });
            } catch (err) {
              res.status(500).json({
                msg: err.message
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Get one subscriber

router.get('/:id', function (req, res) {}); // Create one subscriber

router.post('/', function (req, res) {}); // Update one subscriber

router.patch('/:id', function (req, res) {}); // Delete one subscriber

router["delete"]('/:id', function (req, res) {});
module.exports = router;
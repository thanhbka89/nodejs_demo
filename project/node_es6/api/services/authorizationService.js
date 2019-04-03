"use strict";

//ref : https://viettut.com/lap-trinh/nodejs/jwt-xac-thuc-nguoi-dung-trong-rest-api-phan-3/

const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 *
 * @param req
 * @returns {null}
 */
function getUser(req) {
  let authorization = req.header('Authorization');
  if (!authorization) {
    return null;
  }

  let token = authorization.split(' ')[1];
  if (!token) {
    return null;
  }

  let publicKey = fs.readFileSync('../../ssh/pub_key');

  return jwt.verify(token, publicKey, function (error, user) {
    if (error) {
        return null;
    }

    return user;
  });
}

module.exports = {
  getUser: getUser,
};
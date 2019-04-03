'use strict';

const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt){
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');

  return {
    salt:salt,
    passwordHash:value
  };
}

/**
 *
 * @param userpassword
 * @param salt
 *
 * @returns {{salt, passwordHash}}
 */
function saltHashPassword(userpassword, salt) {
  if (!salt) {
    salt = genRandomString(32); /** Gives us salt of length 16 */
  }

  return sha512(userpassword, salt);
}

module.exports = {
  saltHashPassword: saltHashPassword,
  genRandomString: genRandomString
};
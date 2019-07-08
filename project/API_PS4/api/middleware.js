let jwt = require("jsonwebtoken")
import CONFIG from '../config/config'

let checkToken = (req, res, next) => {
  let data = {
    success: false,
    message: "Auth token is not supplied"
  };
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json(data);
  }
  //   if (token.startsWith('Bearer ')) {
  //     // Remove Bearer from string
  //     token = token.slice(7, token.length);
  //   }
  token = token.split(" ")[1];

  if (token) {
    jwt.verify(token, CONFIG.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json(data)
  }
};

module.exports = {
  checkToken: checkToken
};

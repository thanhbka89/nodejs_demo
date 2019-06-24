/** ref : https://www.codementor.io/shanewignall/making-a-restful-backend-with-node-js-knf7nbsii */
/** ref : https://www.codementor.io/asciidev/testing-a-node-express-application-with-mocha-amp-chai-nqb2nutoz */

const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const morgan = require('morgan')

//json web token
let jwt = require("jsonwebtoken");
let config = require("./config/config");
let middleware = require("./api/middleware");
class HandlerGenerator {
  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = "admin";
    let mockedPassword = "password";

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({ username: username }, config.secret, {
          expiresIn: "24h" // expires in 24 hours
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: "Incorrect username or password"
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    }
  }
  index(req, res) {
    res.json({
      success: true,
      message: "Index page"
    });
  }
}

// import cors from "cors";
import routes from './api/routes';
import app1 from './app';
import bird from './api/routes/router';
import uuidv4 from 'uuid/v4';
import 'dotenv/config';
console.log(process.env.MY_SECRET);

import models from './dummy/student';
//console.log(models);
import Database from './api/models/Database'

// config
const port = process.env.PORT || 8989;

//routes
const api_home = require('./api/routes/home');
const api_product = require('./api/routes/product');

// Use Node.js body parsing middleware : parses incoming post request data
app.use(morgan('combined'));
// app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//run before middleware
app.get('/check', (req, res) => {
  let data = 'PASSED -> ' + uuidv4()
  res.json({data})
})

//https://appdividend.com/2018/02/03/express-middleware-tutorial-example-scratch/
//Types of  Express Middleware : 5
// - Application-level middleware
// - Router-level middleware
// - Error-handling middleware
// - Built-in middleware
// - Third-party middleware

//Middleware Application
app.use((req, res, next) => {
    console.log('App Middleware : Hi');
    req.context = {
        models,
        me: models.users[1],
    };

  next();
});

//using jwt
let handlers = new HandlerGenerator();
app.post('/loginjwt', handlers.login);
app.get('/get_index', middleware.checkToken, handlers.index);

app.get("/api", (req, res) => {
  const sql = "SELECT * FROM users";
  new Database().query(sql).then(rows => res.json(rows))
});

// route middleware that will happen on every request
router.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url);
  console.log("Router Middleware: Hi");
  // continue doing what we were doing and go to the route
  next();
});
router.get("/", (req, res) => {
  res.send({
    message: "REST API Home"
  });
});
// route with parameters (http://localhost:8080/hello/:name)
router.get("/hello/:name", (req, res) => {
  res.send("hello " + req.params.name + "!");
});
// route middleware to validate :name
router.param("name", (req, res, next, name) => {
  console.log("doing name validations on " + name);

  // once validation is done save the new item in the req
  req.name = name;
  // go to the next thing
  next();
});

// route with parameters (http://localhost:8080/midd/:name)
router.get("/midd/:name", (req, res) => {
  res.send("hello " + req.name + "!");
});

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  
  next();
});

// apply the routes to our application
api_home(app);
api_product(app);
app.use('/api/v1', router);
app.use('/api/v2', bird);
app.use('/bird/', routes.bird);
app.use('/users', routes.user);

//api PS4
app.use('/api/ps4/v1/user', routes.user)
app.use('/api/ps4/v1/vendor', routes.vendor)
app.use('/api/ps4/v1/item', routes.item)
app.use('/api/ps4/v1/trans', routes.transaction)

//Error-handling middleware
//middleware để check nếu request API không tồn tại
app.use((req, res) => {
    res.status(404).json({
        url: req.originalUrl + ' not found'
    });
});

//start Express server on defined port
app.listen(port, error => {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }
  console.log(`Server listening on port ${port}`);
});

//log to console to let us know it's working
console.log("API running on port: " + port);

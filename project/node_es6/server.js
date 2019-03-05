/** ref : https://www.codementor.io/shanewignall/making-a-restful-backend-with-node-js-knf7nbsii */
/** ref : https://www.codementor.io/asciidev/testing-a-node-express-application-with-mocha-amp-chai-nqb2nutoz */

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('./api/models/dbconnection');

import app1 from './app';

//config
const port = process.env.PORT || 8989;

//routes
const api_home = require('./api/routes/index');
const api_product = require('./api/routes/product');

// Use Node.js body parsing middleware : parses incoming post request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//https://appdividend.com/2018/02/03/express-middleware-tutorial-example-scratch/
//Types of  Express Middleware : 5
// - Application-level middleware
// - Router-level middleware
// - Error-handling middleware
// - Built-in middleware
// - Third-party middleware

//Middleware Application
app.use((req, res, next) => {
    console.log('App : Hi');

    next();
});

app.get('/api', function (req, res) {
    const sql = "SELECT * FROM products";
    mysql.query(sql, function (err, results, fields) {
        if (err) throw err;
        // console.log(fields);
        res.send({
            data: results
        });
    })
});

app.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function (req, res) {
        res.send('this is the login form');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function (req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

// route middleware that will happen on every request
router.use(function (req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    console.log('Router: Hi');
    // continue doing what we were doing and go to the route
    next();
});
router.get('/', function (req, res) {
    res.send({
        message: 'REST API Home'
    });
});
router.get('/about', function (req, res) {
    res.send('im the about page!');
});
// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.params.name + '!');
});
// route middleware to validate :name
router.param('name', function (req, res, next, name) {
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next();
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/midd/:name', function (req, res) {
    res.send('hello ' + req.name + '!');
});

// apply the routes to our application
api_home(app);
api_product(app);
app.use('/api/v1', router);

//Error-handling middleware
//middleware để check nếu request API không tồn tại
// app.use((req, res) => {
//     console.log('404');
//     res.status(404).json({
//         url: req.originalUrl + ' not found'
//     });
// });


//start Express server on defined port
app.listen(port, (error) => {
    if (error) {
        console.log(`Error: ${error}`);
        return;
    }
    console.log(`Server listening on port ${port}`);
});

//log to console to let us know it's working
console.log('API running on port: ' + port);
'use strict';

function logOriginalUrl(req, res, next) {
    console.log('OUT_Request URL:', req.originalUrl)
    next()
}

function logMethod(req, res, next) {
    console.log('OUT_Request Type:', req.method)
    next()
}

const logStuff = [logOriginalUrl, logMethod]

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'RESTAPI v1.0'
        });
    });

    app.use('/path/:id', function (req, res, next) {
        console.log('Request Type:', req.method);
        next();
    });
    app.get('/path/:id', function (req, res, next) {
        console.log(req.params.id);
        res.json({
            data: 'USER'
        });
    });

    app.use('/user/:id', function (req, res, next) {
        console.log('Request URL:', req.originalUrl)
        next()
    }, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
    app.get('/user/:id', function (req, res, next) {
        // if the user ID is 0, skip to the next route
        if (req.params.id === '0') next('route')
        // otherwise pass the control to the next middleware function in this stack
        else next()
    }, function (req, res, next) {
        // send a regular response
        res.send('regular')
    })

    // handler for the /user/:id path, which sends a special response
    app.get('/user/:id', function (req, res, next) {
        res.send('special')
    });

    //array middleware
    app.get('/arrmid/', logStuff, function (req, res, next) {
        res.send('Array User Info')
      })
}

// Export the router
module.exports = router;
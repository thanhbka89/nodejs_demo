'use strict';

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'RESTAPI v1.0'
        });
    });
}

// Export the router
module.exports = router;

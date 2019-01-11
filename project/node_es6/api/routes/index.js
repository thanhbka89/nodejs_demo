'use strict';

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'REST API v1'
        });
    });
}

// Export the router
module.exports = router;

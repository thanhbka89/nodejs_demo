# Environments
- Node: v12.16.1
- Mongo: v4
- Redis

# Setup
- Install: node, mongo, redis, rabbitmq, IDE (vscode, ...)
- clone sourcecode
- Access root folder, run : `npm install`
- Access queue: https://api.cloudamqp.com/ 
    to create Queue name: users, jobs, user.login, user.update

- Develop, run : `npm run dev`
- Test: `npm run test`
- Deploy production: `npm run build`
- Deploy use PM2: `npm run deploy`
    ref:    `pm2 reload ecosystem.config.js` # reload all
            `pm2 stop ecosystem.config.js`   # stop all
            `pm2 delete ecosystem.config.js` # delete all
- Test API: use Advanced REST client, Postman

# RBAC & ABAC package
- @casl/ability : RBAC, ex: middleware in abilities.js, using in AccountController.js
- accesscontrol : RBAC & ABAC, ex: roles.js, middleware in middlewares/index.js, using in routes/user.js
- acl : RBAC, ex: middleware in middlewares/index.js, using in routes/user.js
    ref: https://viblo.asia/p/expressjs-phan-quyen-theo-vai-tro-voi-package-node-acl-6J3Zg29qKmB
         https://blog.codecentric.de/en/2018/07/protecting-resources-with-node_acl-module-in-nodejs/
- manual role, ex: middleware in middlewares/index.js, using in routes/user.js
    ref: https://dev.to/sateeshm/user-role-management-in-nodejs-express-mongodb-58mp

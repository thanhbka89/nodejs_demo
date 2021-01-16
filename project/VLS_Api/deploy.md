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
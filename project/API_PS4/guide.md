<!-- Ref link 
https://appdividend.com/2018/02/03/node-js-express-tutorial-beginners-2018/
https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6

JWT:
https://scotch.io/tutorials/authenticate-a-node-es6-api-with-json-web-tokens
http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
-->

- B1: Cai package  : (ap dung cho case ma copy source lan dau)
    npm install

    #Cai them cac package
    npm i --save express mongoose
    npm i --save-dev babel-cli babel-preset-env nodemon

- B2: Chay mysql server (run Laragon va open mysql)
- B3: Chay chuong trinh trong qua trinh dev:
    npm start

*Huong dan Update dependency*
# Hiển thị list các lib bị outdated
    npm audit
# Update minor và patch version trong package.json
    npm outdated
    npm update

*Huong dan deploy*
- B1: truy cap thu muc code, mở cmder, gõ :
    npm run clean
    npm run build
- B2: Sau khi build ra thư mục dist, mở VSCode và trong terminal gõ:
    node .\dist\server.js

How to fix different node module version?
    npm rebuild bcrypt --update-binary
    or :
    rm -rf node_modules/bcrypt
    npm install

*Huong dan cach debug Node tren VSCode*
- Vao Settings -> Debug > Node: Auto Attach and set the drop down to “on”
- Trong thu muc root , go : npm run debug

*PM2*
http://stayregular.net/blog/make-a-nodejs-api-with-mysql

*QUEUE*
https://codewithhugo.com/bring-redux-to-your-queue-logic-an-express-setup-with-es6-and-bull-queue/
https://medium.com/@shabir/sequential-job-processing-in-nodejs-4408bce3943b
    
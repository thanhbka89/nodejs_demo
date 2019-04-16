*Cai dat Vue-CLI*
B0 :
    node -v  //check version node
    npm -v   //check version npm
    npm install npm@latest -g   //update version lastest for npm

B1 : npm install -g vue-cli   //cai dat Vue-CLI
     //npm install -g @vue/cli

B2 : Tao project mau
    vue init webpack vue-cli-example

B3: DEV, Truy cap vao thu muc code, go:
    cd vue-cli-example
    npm run dev 

    Build file va chay truoc khi deploy:
    npm run prod

*Keys*
- Vue router
- Communication component: http://localhost:8080/user
    ref : https://viblo.asia/p/vuejs-giao-tiep-giua-cac-component-Ljy5Vxd3Zra
    + Truyen data tu componen parent xuong component child : su dung attribue props (trong component child)
    + Giao tiep component child len compoent parent
    + Giao tiep giua 2 component child co cung compoent parent
    + Giao tiep giua 2 component child khong cung component parent
    // main.js
    // Use「Vue.prototype」to setup globally
    const EventBus = new Vue()
    Object.defineProperties(Vue.prototype, {
        $bus: {
            get: function() {
                return EventBus
            }
        }
    })

    // App.vue
    // Listen the event
    this.$bus.$on('isLoading', (event) => {
        this.loadingStatus = event
    })

    // Signin.vue
    // Fire the call
    this.$bus.$emit('isLoading', false)
    
- Multilang : 
    ref : https://viblo.asia/p/vuejs-da-ngon-ngu-trong-ung-dung-vue-6J3Zg2wLKmB
    fix lai : https://kuanhsuh.github.io/How-to-implement-multi-language-with-Vue-i18n.html
              https://github.com/kuanhsuh/vue-i18n-sandbox/blob/master/src/App.vue
- VueX: Centralized State Management for Vue.js
- Axios Get API: là một thư viện HTTP Client dựa trên Promise
    Tim hieu them : Transforms và Interceptors

    Dữ liệu trả về cho một request sẽ mang các thông tin sau:
    {
        // `data` là dữ liệu trả về được cung cấp bởi server
        data: {},

        // `status` là mã HTTP status trả về từ server
        status: 200,

        // `statusText` là thông điệp HTTP status trả về từ server
        statusText: 'OK',

        // `headers` là các header mà server phản hồi
        // Các tên của header được viết thường toàn bộ
        headers: {},

        // `config` là các cấu hình khi thực hiện request
        config: {},

        // `request` là request thực hiện để nhận được response này
        request: {}
    }

- Tham khao structure project : 
    https://medium.com/hong-kong-tech/reusable-scalable-and-easy-to-organize-project-using-vuejs-part-2-c7e82044d7fc
    https://medium.com/hong-kong-tech/reusable-scalable-and-easy-to-organize-project-using-vuejs-part-3-ed8cba6b4dfe

*Deploy project vue to Heroku*
ref: https://hoanguyenit.com/deploying-vuejs-to-heroku.html
https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489
- B0: Tao project tren Heroku
- B1: Tạo một file để chạy server.js nằm ngoài thư mục root của bạn, tại sao phải tạo file server.js, bởi vì nếu không tạo file khỏi động này thì trên heroku không thể khỏi động server web được nhé, cũng giống như trong NodeJS vậy, cũng cần tạo một file khỏi động máy server để lắng nghe kết nối

    npm install express --save

    //server.js
    var express = require('express');
    var path = require('path');
    var serveStatic = require('serve-static');
    app = express();
    app.use(serveStatic(__dirname + "/dist"));
    var port = process.env.PORT || 5000;
    app.listen(port);
    console.log('server started '+ port);

    Sau khi bạn tạo xong bạn bắt đầu chạy câu lệnh biên dịch sau: npm run build 
    Chạy câu lệnh: node server.js lên xem, và gỏ lên trình duyệt: http://localhost:5000 bạn sẽ thấy kết quả bạn vừa làm,
- B2: tiếp theo là làm thế nào để deploy trên Heroku chạy được mới là quan trọng, để làm được điều này bạn cần chỉnh sửa lại một vài thông tin trong package.json của thư mục như sau:

    //package.json
    "scripts": {
        "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "node server.js", // edit this line here
        "unit": "jest --config test/unit/jest.conf.js --coverage",
        "e2e": "node test/e2e/runner.js",
        "test": "npm run unit && npm run e2e",
        "build": "node build/build.js"
    },

    Bạn xem đoạn mã trên mình edit lại "start":"node server.js" khai báo để chạy cmd này nhé, chúng ta cần làm điều này vì không thôi Heroku không hiểu và sẽ xảy ra lỗi.

    Tiếp theo bạn cần chỉnh loại bỏ thư mục dist trong file .gitigore này khi bạn deploy lên Heroku nhé! 
    .DS_Store
    /dist/ <--- remove this line
    node_modules/
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    /test/unit/coverage/
    /test/e2e/reports/
    selenium-debug.log
    
    # Editor directories and files
    .idea
    .vscode
    *.suo
    *.ntvs*
    *.njsproj
    *.sln

    Vậy là xong giờ là bước quan trọng để deploy lên Heroku thôi nào, ví dụ tôi có một project tên là app-test-vuejs trên heroku thì tôi deploy lên, nhớ là máy bạn phải cài Heroku rồi nhé mới gõ được câu lệnh heroku login nhé! ở đây mình cài rồi các bạn có thể lên trang của heroku và tải về rồi cài vô máy tính nhé!

    Các bạn trỏ vào thư mục project của các bạn nhé và thực hiện câu lệnh trong cmd với câu lệnh bên dưới đây:
    $ heroku login
    $ heroku git:clone -a app-test-vuejs
    $ git add .
    $ git commit -am "upload lần đầu tiên"
    $ git push heroku master

    Sau khi chạy xong bạn tiến hành gõ câu lệnh: heroku open để nó tự động mở trang website app của bạn nhé!


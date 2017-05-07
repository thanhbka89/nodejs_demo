import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  console.log('hello');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

var ex = require('./2_import_export');
var promise = require('./promise');
var obj = require('./module_test')

//Nếu ta không add thêm thành phần vào biến module.exports hay không gán module.exports bằng một object nào đó thì hiển nhiên module.exports
//sẽ không chứa bất kỳ dữ liệu gì, và kết qủa require() nhận lại được sẽ là một object rỗng.
console.log(ex);
console.log(promise);
console.log(obj);
obj.obj.tellName();

var arrow = require('./3_arrow');
console.log(arrow);

require('./4_destructuring');
require('./5_spread_operator');
require('./6_for_of');
require('./7_array_method');

//import module
var greetings = require('./module_export');
console.log(greetings.sayHelloInEnglish());
greetings.sayHelloInSpanish();

import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  console.log('hello');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

require('./2_import_export');

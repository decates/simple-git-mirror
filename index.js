var http = require('http');

var action = require("./action.js");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got it.\n');
  action.run();
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
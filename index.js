var http = require('http');

var action = require("./action.js");

var portNumber = 8080;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got it.\n');
  action.run();
}).listen(portNumber);
console.log('Server running on port ' + portNumber);
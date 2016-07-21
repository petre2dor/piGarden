'use strict'
const http = require('http')
class Request {
    constructor(host, port = 3000) {
        this.options = {
              host: host,
              port: port
        };
    }

    query (path, callback) {
        this.options.path = path
        this.options.method = 'get'

        var body = '';
        http.request(this.options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              body += chunk;
          })
          res.on('error', (e) => {
              console.log(`Got res error: ${e.message}`);
          })
          res.on('end', function (){
              callback(body);
          })
        })
        .on('error', (e) => {
          console.log(`Got error: ${e.message}`);
        })
        .end()

        return body
    }
}

// exports.Request;
module.exports = Request

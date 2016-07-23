'use strict'
const http = require('http')
const querystring = require('querystring')
class Request {
    constructor(host, port = 3000) {
        this.options = {
              host: host,
              port: port
        };
    }

    get (path, callback) {
        this.options.path = path
        this.options.method = 'get'

        var body = '';
        http.request(this.options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              body += chunk
          })
          res.on('end', function (){
              callback(JSON.parse(body))
          })
        })
        .on('error', (e) => {
            console.log(`problem with request: ${e.message}`)
        })
        .end()
    }

    post (path, postData, callback) {
        var postData = querystring.stringify(postData)

        var options = {
          hostname: 'localhost',
          port: 3000,
          path: '/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        }

        var body = ''
        var req = http.request(options, (res) => {
          res.setEncoding('utf8')
          res.on('data', (chunk) => {
            body += chunk
          });
          res.on('end', () => {
            callback(JSON.parse(body))
          });
        });

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`)
        });

        // write data to request body
        req.write(postData)
        req.end()
    }
}

// exports.Request;
module.exports = Request

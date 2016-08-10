'use strict'
const http = require('http')
const querystring = require('querystring')
class Request {
    constructor(host, port = 3000) {
        this.options = {
              host: host,
              port: port
        }
    }

    // returns a Promise
    get (path, callback) {
        this.options.path = path
        this.options.method = 'get'

        return this.getHttpRequest()
    }

    // returns a Promise
    // todo -> on status code > 299 -> reject()
    getHttpRequest() {
        var body = '';
        return new Promise( (resolve, reject) => {
            http.request(this.options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    body += chunk
                })
                res.on('end', function (){
                    resolve(JSON.parse(body))
                })
            })
            .on('error', (e) => {
                reject(`problem with request: ${e.message}`)
            })
            .end()
        })
    }

    // returns a Promise
    post (path, postData, callback) {
        var postData = querystring.stringify(postData)

        var options = {
          path: path,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        }

        // todo move this into a separate method (like getHttpRequest)
        // so we can mock in testing
        var body = ''
        var req = http.request(options, (res) => {
          res.setEncoding('utf8')
          res.on('data', (chunk) => {
            body += chunk
          })
          res.on('end', () => {
            callback(JSON.parse(body))
          })
        })

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`)
        })

        // write data to request body
        req.write(postData)
        req.end()
    }
}

module.exports = Request

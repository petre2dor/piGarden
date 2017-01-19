'use strict'
const http = require('http')
const querystring = require('querystring')
class Request {
    constructor(host = 'localhost', port = 3000) {
        this.options = {
            host: host,
            port: port
        }
    }

    // returns a Promise
    get (path) {
        this.options.path = path
        this.options.method = 'get'

        return this.getHttpRequest()
    }

    // returns a Promise
    // todo -> on status code > 299 -> reject()
    getHttpRequest() {
        var body = '';
        return new Promise( (resolve, reject) => {
            var req = http.request(this.options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    body += chunk
                })
                res.on('end', function (){
                    var response = false
                    try { response = JSON.parse(body) } catch (e) {}
                    if(response.httpCode < 400){
                        resolve(response)
                    }else{
                        reject(response)
                    }
                })
            })
            req.on('error', (e) => {
                reject({
                        httpCode: 400,
                        type: 'ERROR',
                        message: 'Problem with request. Err msg: '+e.message + '. Options:' + JSON.stringify(this.options),
                        data: e
                    })
            })
            req.end()
        })
    }

    // returns a Promise
    post (path, postData) {
        var postData = JSON.stringify(postData)

        this.options.path    = path
        this.options.method  = 'POST'
        this.options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }


        // todo move this into a separate method (like getHttpRequest)
        // so we can mock in testing
        var body = ''
        return new Promise( (resolve, reject) => {
            var req = http.request(this.options, res => {
                res.setEncoding('utf8')
                res.on('data', (chunk) => {
                    body += chunk
                })
                res.on('end', () => {
                    var response = false
                    try { response = JSON.parse(body) } catch (e) {}
                    resolve(response)
                })
            })

            req.on('error', (e) => {
                console.log('problem with request:', e)
                reject(e)
            })

            // write data to request body
            req.write(postData)
            req.end()
        })
    }
}

module.exports = Request

'use strict'
var Request = require('./util/request.js')

var device = new Request('localhost', 3000)
device.post('/', {'postData': 'hello worlds'}, (data) => {
    console.log('index: ')
    console.log(data)
})

// var express = require('express')
// var app = express()



// app.get('/', function (req, res) {
//     res.status(500)
//     res.json({ error: 'message' })
// })

// app.listen(3000)

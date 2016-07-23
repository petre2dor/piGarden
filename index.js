'use strict'
// const MODEL_PATH = 'db_models/'
var Request     = require('./util/request.js')
var LogModel    = require('./db_models/LogModel.js')
var mysql       = require('mysql')
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'db_gardener',
  password : 'KTgdXz3SSMCY',
  database : 'pi_garden'
})
conn.connect()


var log = new LogModel(conn);
log.setAreaId(1)
log.setDeviceId(1)
log.setType('error')
log.setDescription('Test insert')
log.insert()


function exitHandler(options, err) {
    conn.end();
    if (err)
        console.log(err.stack)
    if (options.exit)
        process.exit();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));



// var device = new Request('localhost', 3000)
// device.post('/', {'postData': 'hello worlds'}, (data) => {
//     console.log('index: ')
//     console.log(data)
// })



// var express = require('express')
// var app = express()



// app.get('/', function (req, res) {
//     res.status(500)
//     res.json({ error: 'message' })
// })

// app.listen(3000)

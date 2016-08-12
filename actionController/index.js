'use strict'
var express = require('express')
var bodyParser = require('body-parser')

var Connection      = require('../util/connection');
var Routes          = require('./Routes')
var LogModel        = require('../db_models/LogModel.js')


var app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

try {
    var log = new LogModel()

    Connection.init()
    Routes.configure(app)

    var server = app.listen(3000, function(){
        console.log('Server listening on port ' + server.address().port)
        log.create({area_id: 0, device_id: 0, type: 'AC_START', description: 'Server listening on port ' + server.address().port})
    })
} catch (e) {
    throw e
    // log.create({area_id: 0, device_id: 0, type: 'ACTION_RUNNER_ERR', description: e})
} finally {
    console.log('---finally---')
}
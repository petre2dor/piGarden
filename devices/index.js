'use strict'
var express = require('express')
var bodyParser = require('body-parser')

var Request     = require('../util/request.js')
var Connection  = require('../util/connection');
var Routes      = require('./Routes')
var LogModel    = require('../db_models/LogModel.js')


var app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

try {
    Connection.init()
    Routes.configure(app)

    var server = app.listen(3001, function(){
        console.log('Server listening on port ' + server.address().port)
        LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'D_START', description: '/devices server listening on port ' + server.address().port})
    })
} catch (e) {
    LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'D_ERR', description: 'Error starting /devices: ' + e})
    throw e
}

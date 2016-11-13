'use strict'
var express = require('express')
var bodyParser = require('body-parser')

var Connection      = require('util/connection')
var Routes          = require('actionController/Routes')
var LogModel        = require('db_models/LogModel.js')

process.title = "piGarden-AC"


var app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

try {
    Connection.init()
    Routes.configure(app)

    var server = app.listen(3000, function(){
        console.log('Server listening on port ' + server.address().port)
        LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'AC_START', description: 'AC Server listening on port ' + server.address().port})
    })
} catch (e) {
    LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'AC_START_ERR', description: 'Error starting AC server ' + e})
    throw e
}

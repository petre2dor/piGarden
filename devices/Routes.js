var Connection  = require('util/connection')
var LogModel    = require('db_models/LogModel')
var Temperature = require('devices/controller/temperature/Temperature')
var Humidity    = require('devices/controller/humidity/Humidity')
var Valve       = require('devices/controller/valve/Valve')
var fs          = require('fs')

// var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/temperature/:deviceId', Temperature.get)
        app.get('/humidity/:deviceId', Humidity.get)
        app.get('/valve/open/:deviceId', Valve.open)
        app.get('/valve/close/:deviceId', Valve.close)
    }
}

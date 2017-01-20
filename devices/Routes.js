var Connection  = require('util/connection')
var LogModel    = require('db_models/LogModel')
// var Temperature = require('devices/controller/temperature/Temperature')
// var Humidity    = require('devices/controller/humidity/Humidity')
// var Valve       = require('devices/controller/valve/Valve')
var Device      = require('devices/controller/Device')
var fs          = require('fs')

module.exports = {
    configure: function(app) {
        app.get('/read/:deviceId', Device.read)
        app.get('/write/:deviceId', Device.write)
        // app.get('/humidity/:deviceId', Humidity.get)
        // app.get('/valve/open/:deviceId', Valve.open)
        // app.get('/valve/close/:deviceId', Valve.close)
    }
}

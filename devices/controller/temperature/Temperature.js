var LogModel    = require('db_models/LogModel.js')
var DeviceModel = require('db_models/DeviceModel')
var PythonShell = require('python-shell')
// if (process.env.PI_GARDEN_ENV=="DEVPI" || process.env.PI_GARDEN_ENV=="PRODUCTION") {
var Mcpadc      = require('mcp-spi-adc')
var DHTSensor   = require('node-dht-sensor')
// }
var config      = require('config.json')[process.env.PI_GARDEN_ENV]
var tmp36       = require('devices/controller/temperature/read_tmp36'+config.sufix+'.js')
var dht22       = require('devices/controller/temperature/read_dht22'+config.sufix+'.js')

// PythonShell.defaultOptions = { scriptPath: '' }
exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(() => {
        return dht22.readTemperature()
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(e => {
        res.status(404).json({
            httpCode: 404,
            type: 'ERROR',
            message: e.message,
            data: e
        })
    })
}

var LogModel    = require('db_models/LogModel.js')
var DeviceModel = require('db_models/DeviceModel')
var config      = require('config.json')[process.env.PI_GARDEN_ENV]
var tmp36       = require('devices/controller/temperature/read_tmp36'+config.sufix+'.js')

exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(() => {
        return tmp36.readTemperature()
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

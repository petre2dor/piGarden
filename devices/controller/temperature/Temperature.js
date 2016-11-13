const LogModel    = require('db_models/LogModel.js')
const DeviceModel = require('db_models/DeviceModel')
const config      = require('config.json')[process.env.PI_GARDEN_ENV]


exports.get = function(req, res) {
    let deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(device => {
        let source = require('./'+device.getOptions().js_file+config.sufix+'.js')
        return source.readTemperature()
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

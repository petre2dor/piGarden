const LogModel    = require('db_models/LogModel.js')
const DeviceModel = require('db_models/DeviceModel')
const config      = require('config.json')[process.env.PI_GARDEN_ENV]

exports.read = (req, res) => {
    let deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(device => {
        let deviceOptions = device.getOptions()
        let source = require('./'+deviceOptions.js_file + config.sufix)

        return source.read(deviceOptions)
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

exports.write = (req, res) => {
    let deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(device => {
        let deviceOptions = device.getOptions()
        let source = require('./'+deviceOptions.js_file + config.sufix)

        return source.write(deviceOptions)
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

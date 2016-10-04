var LogModel    = require('../../db_models/LogModel.js')
var DeviceModel = require('../../db_models/DeviceModel')

exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(() => {
            var temperature = getRandomTemperature()

            res.status(200).json({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Here is the temperature',
                data: {temperature: temperature}
            })
        })
        .catch(() => {
            res.status(404).json({
                httpCode: 404,
                type: 'ERROR',
                message: 'Device ' + req.params.deviceId + ' not found.',
                data: {}
            })
        })
}

getRandomTemperature = function(){
    return Math.floor(Math.random() * (35 - 15) + 15)
}

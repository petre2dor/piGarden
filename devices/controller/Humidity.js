var LogModel    = require('../../db_models/LogModel')
var DeviceModel = require('../../db_models/DeviceModel')

exports.get = function(req, res) {
    LogModel.create({
        action_id: 0,
        area_id: 0,
        device_id: req.params.deviceId,
        type: 'D_GET_HUMIDITY',
        description: 'Get mock humidity from device'
    })

    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(() => {
            res.status(200).json({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Here is the humidity',
                data: {humidity: Math.floor(Math.random() * (77 - 65) + 65)}
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

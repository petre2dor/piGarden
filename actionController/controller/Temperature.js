var LogModel        = require('db_models/LogModel.js')
var DeviceModel     = require('db_models/DeviceModel')
var Request         = require('util/request')
var StatsModel      = require('db_models/StatsModel')
var StatsController = require('./Stats')

exports.read = function(req, res) {
    var deviceModel
    let device = new DeviceModel()
    device.setId(req.params.deviceId);
    device.read()
    .then(device => {
        deviceModel = device
        let request = new Request('localhost', 3001)
        return request.get('/temperature/'+deviceModel.getId())
    })
    .then(response => {
        LogModel.create({type: 'READ_TEMPERATURE', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: JSON.stringify(response)})

        StatsController.persistDeviceRead(deviceModel.getId(), 'TEMPERATURE', response.data.temperature)

        res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Temperature read successfully.'
            })
    })
    .catch(err => {
        LogModel.create({type: 'READ_TEMPERATURE_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err.message})
        res.send({
                httpCode: 400,
                type: 'ERROR',
                message: 'There was an error. Please try again.',
                data: err
            })
    })
}

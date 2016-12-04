var LogModel    = require('db_models/LogModel')
var DeviceModel = require('db_models/DeviceModel')
var Request     = require('util/request')
var StatsModel  = require('db_models/StatsModel')
var StatsController = require('./Stats')


exports.read = function(req, res) {
    var deviceModel
    let device = new DeviceModel()
    device.setId(req.params.deviceId);
    device.read()
    .then(device => {
        deviceModel = device
        let request = new Request('localhost', 3001)
        return request.get('/humidity/'+deviceModel.getId())
    })
    .then(response => {
        LogModel.create({type: 'READ_HUMIDITY', action_id: 0, device_id: deviceModel.getId(), area_id: 0, description: JSON.stringify(response)})

        StatsController.persistDeviceRead(deviceModel.getId(), 'HUMIDITY', response.data.humidity)

        res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Humidity read successfully.'
            })
    })
    .catch(err => {
        LogModel.create({type: 'READ_HUMIDITY_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err})
        res.send({
                httpCode: 400,
                type: 'ERROR',
                message: 'There was an error. Please try again.',
                data: err
            })
    })
}

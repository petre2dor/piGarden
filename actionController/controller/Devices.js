var LogModel        = require('db_models/LogModel.js')
var DeviceModel     = require('db_models/DeviceModel')
var Request         = require('util/request')
var StatsModel      = require('db_models/StatsModel')
var StatsController = require('./Stats')

exports.read = (req, res) => {
    let request = new Request('127.0.0.1', 3001)
    request.get('/read/'+req.params.deviceId)
        .then(result => {
            LogModel.create({type: 'READ', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: JSON.stringify(result)})
            result.data.forEach(element => {
                StatsController.persistDeviceRead(req.params.deviceId, element.type, element.value)
                console.log(element.type + ': ' + element.value);
            })

            res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Device read successfully.'
            })

        })
        .catch(err => {
            LogModel.create({type: 'READ_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err.message})
            res.send({
                    httpCode: 400,
                    type: 'ERROR',
                    message: 'There was an error. Please try again.',
                    data: err
                })
        })
}

exports.blink = (req, res) => {
    let request = new Request('127.0.0.1', 3001)
    request.get('/blink/'+req.params.deviceId)
        .then(result => {
            LogModel.create({type: 'WRITE', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: JSON.stringify(result)})
            res.send(result)
        })
        .catch(err => {
            LogModel.create({type: 'WRITE_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err.message})
            res.send(err)
        })
}

exports.receive = (req, res) => {
    let deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(device => {  
            let deviceOptions = device.getOptions()
            if (!deviceOptions.token ||
                !req.body.token 
                || deviceOptions.token !== req.body.token
            ){
                res.status(403).json({
                    httpCode: 403,
                    type: 'ERROR',
                    message: 'Invalid token provided',
                    data: {}
                })
            } else {
                data = JSON.parse(req.body.data)
                
                LogModel.create({ type: 'READ', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: JSON.stringify(data) })
                data.data.forEach(element => {
                    StatsController.persistDeviceRead(req.params.deviceId, element.type, element.value)
                    console.log(element.type + ': ' + element.value);
                })

                res.send({
                    httpCode: 200,
                    type: 'SUCCESS',
                    message: 'Device data successfully saved.'
                })
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({
                httpCode: 404,
                type: 'ERROR',
                message: e.message,
                data: e
            })
        })
}

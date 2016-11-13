var LogModel    = require('db_models/LogModel.js')
var ActionModel = require('db_models/ActionModel')
var Request     = require('util/request')
var StatsModel  = require('db_models/StatsModel')

exports.read = function(req, res) {
    var action = new ActionModel()
    action.setId(req.params.actionId);
    action.read()
    .then(() => {
        let request = new Request('localhost', 3001)
        return request.get('/temperature/1')
    })
    .then(response => {
        LogModel.create({action_id: 0, device_id: action.getDeviceId(), area_id: 0, type: 'READ_TEMPERATURE', description: JSON.stringify(response)})
        StatsModel.create({type: 'TEMPERATURE', value: response.data.temperature})
        res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Temperature read successfully.'
            })
    })
    .catch(err => {
        LogModel.create({action_id: 0, device_id: action.getDeviceId(), area_id: 0, type: 'READ_TEMPERATURE_ERR', description: err.message})
        res.send({
                httpCode: 400,
                type: 'ERROR',
                message: 'There was an error. Please try again.',
                data: err
            })
    })
}

getRandomTemperature = function(){
    return Math.floor(Math.random() * (35 - 15) + 15)
}

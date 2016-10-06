var LogModel    = require('../../db_models/LogModel')
var ActionModel = require('../../db_models/ActionModel')
var Request     = require('../../util/request')
var StatsModel  = require('../../db_models/StatsModel')


exports.read = function(req, res) {
    var action = new ActionModel()
    action.setId(req.params.actionId);
    action.read()
    .then( () => {
        var request = new Request('localhost', 3001)
        return request.get('/humidity/2')
    })
    .then(response => {
        LogModel.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_HUMIDITY', description: JSON.stringify(response)})
        StatsModel.create({type: 'HUMIDITY', value: response.data.humidity})
        res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Humidity read successfully.'
            })
    })
    .catch(err => {
        LogModel.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_HUMIDITY_ERR', description: err})
        res.send({
                httpCode: 400,
                type: 'ERROR',
                message: 'There was an error. Please try again.',
                data: err
            })
    })
}

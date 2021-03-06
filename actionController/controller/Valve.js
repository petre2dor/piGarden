var LogModel        = require('db_models/LogModel.js')
var DeviceModel     = require('db_models/DeviceModel')
var Request         = require('util/request')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

exports.open = function(req, res)
{
    var action = new ActionModel()
    action.setId(req.params.actionId);
    action.read()
        .then(action => {
            LogModel.create({description: 'Read action. Reading closing action.', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            // read Close Valve actionModel
            var closeAction = new ActionModel()
            closeAction.setAreaId(action.getDeviceId())
            closeAction.setObject('VALVE')
            closeAction.setVerb('CLOSE')
            return closeAction.get()
        })
        .then(closeAction => {
            LogModel.create({description: 'Read closing action. Setting it to ACTIVE', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})

            var now = LocalDateTime.now()
            var openValveDuration = Duration.parse(action.getOptions().DURATION) //get from open action

            closeAction.setStatus('ACTIVE')
            closeAction.setNextRunTime(now.plus(openValveDuration).toString())
            return closeAction.update()
        })
        .then(() => {
            LogModel.create({description: 'Closing action updated. Calling /device endpoint.', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            var request = new Request('127.0.0.1', 3001)
            return request.get('/valve/open/2')
        })
        .then(result => {
            LogModel.create({description: 'All done.', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            res.send(result)
        })
        .catch(reason => {
            LogModel.create({description: JSON.stringify(reason), type: 'AC_OPEN_VALVE_ERR', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            res.send(reason)
        })
}


exports.close = function(req, res)
{
    var action = new ActionModel()
    action.setId(req.params.actionId);
    action.read()
        .then(action => {
            LogModel.create({description: 'Read action. Calling /device endpoint.', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            var request = new Request('127.0.0.1', 3001)
            return request.get('/valve/close/2')
        })
        .then(result => {
            LogModel.create({description: 'All done.', type: 'AC_OPEN_VALVE', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            res.send(result)
        })
        .catch(reason => {
            LogModel.create({description: JSON.stringify(reason), type: 'AC_OPEN_VALVE_ERR', device_id: req.params.deviceId, action_id: 0, area_id: 0})
            res.send(reason)
        })
}

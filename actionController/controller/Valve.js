var LogModel        = require('../../db_models/LogModel.js')
var ActionModel     = require('../../db_models/ActionModel')
var Request         = require('../../util/request')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration
var PythonShell     = require('python-shell')

PythonShell.defaultOptions = { scriptPath: '../scripts/valve' }

exports.open = function(req, res) {
    var openValvePy = new PythonShell('open.py');
    var action = new ActionModel()
    action.setId(req.params.actionId);
    action.read()
        .then( () => {
            // read Close Valve actionModel
            var closeAction = new ActionModel()
            closeAction.setAreaId(action.getAreaId())
            closeAction.setObject('VALVE')
            closeAction.setVerb('CLOSE')
            return closeAction.getReadByAreaObjectVerb()
        })
        .then(closeAction => {
            var now = LocalDateTime.now()
            var openValveDuration = Duration.parse(action.getOptions().DURATION) //get from open action

            closeAction.setStatus('ACTIVE')
            closeAction.setNextRunTime(now.plus(openValveDuration).toString())
            return closeAction.update()
        })
        .then(() => {
            // now open the valve

            res.send({
                    httpCode: 200,
                    type: 'SUCCESS',
                    message: 'Valve opened successfully.'
                })
        })
        .catch(reason => {
            res.send({
                    httpCode: 400,
                    type: 'ERROR',
                    message: reason,
                    data: {}
                })
        })
}


exports.close = function(req, res) {
    LogModel.create({action_id: req.params.actionId, area_id: 0, device_id: 0, type: 'CLOSE_VALVE', description: 'Closing valve'})

    res.send({
        httpCode: 200,
        type: 'SUCCESS',
        message: 'Valve closed successfully.'
        data: {}
    })
}

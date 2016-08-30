var Connection      = require('../util/connection');
var LogModel        = require('../db_models/LogModel.js')
var ActionModel     = require('../db_models/ActionModel.js')
var StatsModel      = require('../db_models/StatsModel.js')
var Request         = require('../util/request.js')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

var log = new LogModel()
var stats = new StatsModel()

module.exports = {
    configure: function(app) {
        app.get('/read/temperature/:actionId',function(req,res) {
            var action = new ActionModel()
            action.setId(req.params.actionId);
            action.read()
            .then( () => {
                var request = new Request('localhost', 3001)
                return request.get('/temperature/1')
            })
            .then(response => {
                log.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_TEMPERATURE', description: JSON.stringify(response)})
                stats.create({type: 'TEMPERATURE', value: response.data.temperature})
                res.send({
                        httpCode: 200,
                        type: 'SUCCESS',
                        message: 'Temperature read successfully.'
                    })
            })
            .catch(err => {
                console.log(err)
                log.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_TEMPERATURE_ERR', description: err})
                res.send({
                        httpCode: 400,
                        type: 'ERROR',
                        message: 'There was an error. Please try again.',
                        data: err
                    })
            })
        }),

        app.get('/read/humidity/:actionId',function(req,res) {
            var action = new ActionModel()
            action.setId(req.params.actionId);
            action.read()
            .then( () => {
                var request = new Request('localhost', 3001)
                return request.get('/humidity/2')
            })
            .then(response => {
                log.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_HUMIDITY', description: JSON.stringify(response)})
                stats.create({type: 'HUMIDITY', value: response.data.humidity})
                res.send({
                        httpCode: 200,
                        type: 'SUCCESS',
                        message: 'Humidity read successfully.'
                    })
            })
            .catch(err => {
                log.create({action_id: 0, area_id: action.getAreaId(), device_id: 0, type: 'READ_HUMIDITY_ERR', description: err})
                res.send({
                        httpCode: 400,
                        type: 'ERROR',
                        message: 'There was an error. Please try again.',
                        data: err
                    })
            })
        })

        app.get('/open/valve/:actionId', function(req,res) {
            var action = new ActionModel()
            action.setId(req.params.actionId);
            action.read()
            .then( () => {
                // schedule a close valve actionModel
                var closeAction = new ActionModel()
                closeAction.setAreaId(action.getAreaId())
                closeAction.setObject('VALVE')
                closeAction.setVerb('CLOSE')
                return closeAction.getReadByAreaObjectVerb()
            })
            .then(closeAction => {
                console.log('-- action.getOptions().DURATION', action.getOptions().DURATION)
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
            .catch((reason) => {
                console.log('failed! reason ', reason)
                res.send({
                        httpCode: 400,
                        type: 'ERROR',
                        message: reason,
                        data: 'there was an error'
                    })
            })
        })

        app.get('/close/valve/:actionId', function(req,res) {
            log.create({action_id: req.params.actionId, area_id: 0, device_id: 0, type: 'CLOSE_VALVE', description: err})

            res.send({
                    httpCode: 200,
                    type: 'SUCCESS',
                    message: 'Valve closed successfully.'
                })
        })

    }
}

'use strict'
var LocalDateTime = require('js-joda').LocalDateTime;
var ActionModel = require('../db_models/ActionModel')
var LogModel    = require('../db_models/LogModel')
var Request     = require('../util/request')

var log  = new LogModel()

class ActionHandler {
    constructor() {
        this.actionModel    = new ActionModel()
        this.request        = new Request('localhost', 3000)
        log.create({action_id: 0, area_id: 0, device_id: 0, type: 'AH_INIT', description: 'ActionHandler initialized'})
    }

    run() {
        this.actionModel.readNextAction()
        .then((actionModel) => {
                log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_RUN', description: 'Setting action status to RUNNING'})
                actionModel.setStatus('RUNNING')
                actionModel.update().then(() => {
                    setTimeout(() => {
                        this.run()
                    }, 2000)
                })
                return this.callController(actionModel)
            })
        .then((result) => {
                var actionModel = result[0]
                var controllerResponse = result[1]
                this.reschedule(actionModel, controllerResponse)
            })
        .catch((reason) => {
            log.create({action_id: 0, area_id: 0, device_id: 0, type: 'AH_RUN', description: reason + '. Sleep 5s'})
            setTimeout(() => {
                this.run()
            }, 5000)
        })
    }

    callController(actionModel){
        //call to controller
        return new Promise((resolve, reject) => {
            var path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getAreaId()
            log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_CALL_CONTROLLER', description: 'Calling action controller: ' + path})
            this.request.get(path)
                .then((controllerResponse) => {
                    resolve([actionModel, controllerResponse])
                },(reason) => {
                    log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_CALL_CONTROLLER_ERR', description: 'Calling action controller error: ' + reason})
                })
        })
    }

    reschedule(actionModel, controllerResponse){
        var sec = actionModel.getSchedule().start.every || 60 //default run after 1 min
        log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_RESCHEDULE', description: 'Rescheduling action after ' + sec + ' sec.'})
        actionModel.setNextRunTime(LocalDateTime.now().plusSeconds(sec).toString())
        actionModel.setStatus('ACTIVE')
        actionModel.update()
        .then((result) => {
            // console.log('update result ', result);
            return true
        },(reason) => {
            log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_RESCHEDULE_ERR', description: 'Rescheduling action errror ' + reason})
            throw err
            // console.log('update err ', err);
        })
    }
}

module.exports = ActionHandler

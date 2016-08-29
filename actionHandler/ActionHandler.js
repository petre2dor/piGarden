'use strict'
var LocalDateTime   = require('js-joda').LocalDateTime
var ActionModel     = require('../db_models/ActionModel')
var LogModel        = require('../db_models/LogModel')
var Request         = require('../util/request')
var Duration        = require('js-joda').Duration


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
                // return this.prepareRelatedActions(actionModel)
            })
        // .then((result) => {
        // })
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

    // prepareRelatedActions(actionModel){
    //     switch (actionModel.getObject) {
    //         case expression:
    //
    //             break;
    //         default:
    //
    //     }
    // }

    callController(actionModel){
        //call to controller
        return new Promise((resolve, reject) => {
            var path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getAreaId()
            log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_CALL_CONTROLLER', description: 'Calling action controller: ' + path})
            this.request.get(path)
                .then((controllerResponse) => {
                    resolve([actionModel, controllerResponse])
                })
                .catch((reason) => {
                    log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_CALL_CONTROLLER_ERR', description: 'Calling action controller error: ' + reason})
                    // set action in error state
                    actionModel.setStatus('ERROR')
                    actionModel.update().then(() => {
                        log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_CALL_CONTROLLER', description: 'Action set to status ERROR'})
                    })
                })
        })
    }

    reschedule(actionModel, controllerResponse){
        var nextRunTime = this.getNextRunTime(actionModel.getSchedule())
        log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_RESCHEDULE', description: 'Rescheduling action at ' + nextRunTime})
        actionModel.setNextRunTime(nextRunTime)
        // DISABLED if the
        actionModel.setStatus(this.getNextStatus(actionModel, controllerResponse))
        actionModel.update()
        .then((result) => {
            // console.log('update result ', result);
            return true
        })
        .catch((reason) => {
            log.create({action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, type: 'AH_RESCHEDULE_ERR', description: 'Rescheduling action errror ' + reason})
            throw err
            // console.log('update err ', err);
        })
    }

    getNextRunTime(schedule){
        switch (schedule.type) {
            case 'cyclic':
                return LocalDateTime.now().plus(Duration.parse(schedule.every)).toString()
                break
            case 'fixed':
                return LocalDateTime.now().toString()
                break
            default:
                return LocalDateTime.now().plus(Duration.parse('PT60S')).toString()
        }
    }

    getNextStatus(schedule, controllerResponse){
        // todo -> decide on status based on schedule (disable if the schedule is fixed) and controller response (set to error maybe...)
        switch (schedule.type) {
            case 'cyclic':
                return 'ACTIVE'
                break
            case 'fixed':
                return 'COMPLETED'
                break
            default:
                return 'ERROR'
        }

        return 'ACTIVE'
    }
}

module.exports = ActionHandler

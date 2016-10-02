'use strict'
var LocalDateTime   = require('js-joda').LocalDateTime
var ActionModel     = require('../db_models/ActionModel')
var LogModel        = require('../db_models/LogModel')
var ConfigModel     = require('../db_models/ConfigModel')
var Request         = require('../util/request')
var Duration        = require('js-joda').Duration

class ActionHandler {
    initAndRun() {
        this.actionModel    = new ActionModel()
        this.request        = new Request('localhost', 3000)

        ConfigModel.setName('AH_RETRIES_NO')
        ConfigModel
            .readByName()
            .then((config) => {
                    this.retries_no = config.getValue()
                    LogModel.create({type: 'AH_INIT', description: 'ActionHandler initialized', action_id: 0, area_id: 0, device_id: 0})

                    //RUN FOREST, RUN!!!!!!
                    return this.run()
                })
            .catch((reason) => {
                    LogModel.create({type: 'AH_INIT', description: reason, action_id: 0, area_id: 0, device_id: 0})
                    this.retries_no = 2
                })
    }

    run() {
        this.actionModel.readNextAction()
        .then((actionModel) => {
                LogModel.create({type: 'AH_RUN', description: 'Setting action status to RUNNING', action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
                actionModel.setStatus('RUNNING')
                actionModel.update()

                return this.callController(actionModel)
            })
        .then((actionModelAndACResponse) => {
                var actionModel = actionModelAndACResponse[0]
                var ACResponse = actionModelAndACResponse[1]

                return this.reschedule(actionModel, ACResponse)
            })
        .then((result) => {
                LogModel.create({
                    type: 'AH_RUN',
                    description: 'Done running action '+this.actionModel.getVerb()+' '+this.actionModel.getObject(),
                    action_id: this.actionModel.getId(),
                    area_id: this.actionModel.getAreaId(),
                    device_id: 0,
                })
                setTimeout(() => {
                    console.log('run again');
                    this.run()
                }, 900)
            })
        .catch((actionModelAndReason) => {
                var actionModel = actionModelAndReason[0]
                var reason = actionModelAndReason[1]

                if(reason.message == 'There is no next action available'){
                    LogModel.create({type: 'AH_RUN', action_id: 0, area_id: 0, device_id: 0, description: reason.message})
                }else{
                    LogModel.create({type: 'AH_RUN_ERR', action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0, description: reason.message})
                    this.reschedule(actionModel, reason)
                }
                setTimeout(() => {
                    this.run()
                }, 1000)
            })
    }

    callController(actionModel){
        //call to controller
        return new Promise((resolve, reject) => {
            var path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getId()
            LogModel.create({type: 'AH_CALL_AC', description: 'Calling AC: ' + path, action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
            this.request
                .get(path)
                .then((ACResponse) => {
                    if(ACResponse.httpCode >= 400){
                        reject([actionModel, ACResponse])
                    }else{
                        resolve([actionModel, ACResponse])
                    }
                })
                .catch((reason) => {
                    LogModel.create({type: 'AH_CALL_AC_ERR', description: 'Calling AC error: ' + JSON.stringify(reason.data), action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
                    reject([actionModel, reason])
                })
        })
    }

    reschedule(actionModel, response){
        var nextRunTime = this.getNextRunTime(actionModel.getSchedule(), response)
        var nextStatus = this.getNextStatus(actionModel.getSchedule(), actionModel.getRetries(), response)
        var retries = this.getRetriesNo(actionModel.getRetries(), nextStatus)
        LogModel.create({
                type: 'AH_RESCHEDULE',
                description: 'nextRunTime: ' + nextRunTime + ', status: ' + nextStatus,
                action_id: actionModel.getId(),
                area_id: actionModel.getAreaId(),
                device_id: 0
            })
        actionModel.setNextRunTime(nextRunTime)
        actionModel.setRetries(retries)
        actionModel.setStatus(nextStatus)
        // need to return promise that, in case of err, rejects with [actionModel, reason]
        return new Promise((resolve, reject) => {
            actionModel
                .update()
                .then((result) => {
                    resolve(actionModel, result)
                })
                .catch((reason) => {
                    reject(actionModel, reason)
                })
        })
    }

    getNextRunTime(schedule, response){
        if(response.httpCode >= 400){
            return LocalDateTime.now().plus(Duration.parse('PT2S')).toString()
        }
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

    getNextStatus(schedule, retries, response){
        if(response.httpCode >= 400){
            if(retries < this.retries_no){
                return 'WARNING'
            }
            return 'ERROR'
        }
        switch (schedule.type) {
            case 'cyclic':
                return 'ACTIVE'
                break
            case 'fixed':
                return 'COMPLETED'
                break
            default:
                return 'WARNING'
        }
        return 'ERROR'
    }

    getRetriesNo(oldRetriesNo, nextStatus){
        switch (nextStatus) {
            case 'WARNING':
                return oldRetriesNo + 1
                break
            case 'ERROR':
                return 0
                break
            default:
                return oldRetriesNo + 1
                break
        }
    }
}

module.exports = ActionHandler

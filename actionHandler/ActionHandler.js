'use strict'
var ActionModel     = require('../db_models/ActionModel')
var LogModel        = require('../db_models/LogModel')
var ConfigModel     = require('../db_models/ConfigModel')
var Request         = require('../util/request')
var Duration        = require('js-joda').Duration


class ActionHandler {
    constructor(){
        this.max_retries = 30
    }

    // main method
    run()
    {
        ConfigModel.setName('AH_RETRIES_NO')
        ConfigModel.readByName()
        .then(config => {
            this.max_retries = config.getValue()

            let actionModel = new ActionModel()
            return actionModel.readNextAction()
        })
        .then(actionModel => {
            LogModel.create({type: 'AH_RUN', description: 'Setting action status to RUNNING', action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
            actionModel.setStatus('RUNNING')
            actionModel.update()

            return this.callController(actionModel)
        })
        .then(ACResponse => {
            LogModel.create({type: 'AH_RUN', description: 'AC returned: '+ACResponse.message, action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
            if(ACResponse.httpCode >= 400){
                return new Promise.reject(ACResponse)
            }
            return this.reschedule(actionModel, ACResponse.httpCode)
        })
        .then(result => {
            setTimeout(this.run, 500)
        })
        .catch(reason => {
            if(reason.message == 'There is no next action available'){
                LogModel.create({type: 'AH_RUN', description: '---', action_id: 0, area_id: 0, device_id: 0})
            }else{
                LogModel.create({type: 'AH_RUN_ERR', description: reason.message, action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})
                reschedule(actionModel, reason.httpCode)
            }
            setTimeout(this.run, 500)
        })
    }

    callController(actionModel)
    {
        var path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getId()
        LogModel.create({type: 'AH_CALL_AC', description: 'Calling AC: ' + path, action_id: actionModel.getId(), area_id: actionModel.getAreaId(), device_id: 0})

        let ACRequest   = new Request('localhost', 3000)
        return ACRequest.get(path)
    }

    reschedule(actionModel, httpCode)
    {
        var nextRunTime = this.getNextRunTime(actionModel.getSchedule(), httpCode)
        var nextStatus = this.getNextStatus(actionModel.getSchedule(), httpCode, actionModel.getRetries(), this.max_retries)
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
        return  actionModel.update()
    }

    getNextRunTime(schedule, httpCode){
        var LocalDateTime = require('js-joda').LocalDateTime
        if(httpCode >= 400){
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

    getNextStatus(schedule, httpCode, retries, max_retries)
    {
        if(httpCode >= 400){
            if(retries < max_retries){
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

    getRetriesNo(oldRetriesNo, nextStatus)
    {
        switch (nextStatus) {
            case 'WARNING':
                return oldRetriesNo + 1
                break
            case 'ERROR':
            case 'ACTIVE':
            case 'INACTIVE':
                return 0
                break
            default:
                return oldRetriesNo + 1
                break
        }
    }
}

module.exports = new ActionHandler()

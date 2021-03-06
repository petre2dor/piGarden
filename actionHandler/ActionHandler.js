'use strict'
var ActionModel     = require('db_models/ActionModel')
var LogModel        = require('db_models/LogModel')
var ConfigModel     = require('db_models/ConfigModel')
var Request         = require('util/request')
var Utilities       = require('util/utilities.js')
var Duration        = require('js-joda').Duration

class ActionHandler {
    constructor()
    {
        this.maxRetries = 30
    }

    // main method
    run()
    {
        var actionModel = new ActionModel()
        return actionModel
            .readNextAction()
            .then(action => {
                actionModel = action

                // if no next action, get out
                if(!actionModel.getFields()) throw 404

                // else
                LogModel.create({type: 'AH_RUN', description: 'Setting action status to RUNNING', action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                actionModel.setStatus('RUNNING')
                actionModel.update()

                let ACRequest = new Request('127.0.0.1', 3000)
                return this.callController(ACRequest, actionModel)
            })
            .then(ACResponse => {
                LogModel.create({type: 'AH_RUN', description: 'AC returned: '+ACResponse.message, action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                if(ACResponse.httpCode >= 400) throw ACResponse

                return this.reschedule(actionModel, ACResponse.httpCode)
            })
            .catch(reason => {
                if(reason === 404){
                    return {message: 'There is no next action available.', httpCode: 200, type: 'SUCCESS'}
                }else{
                    LogModel.create({type: 'AH_RUN_ERR', description: reason.message, action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                    return this.reschedule(actionModel, reason.httpCode)
                }
            })
    }

    callController(ACRequest, actionModel)
    {
        let path = '/'+actionModel.getVerb()+'/'+actionModel.getDeviceId()
        LogModel.create({type: 'AH_CALL_AC', description: 'Calling AC: ' + path, action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
        return ACRequest.get(path)
    }

    reschedule(actionModel, httpCode)
    {
        var nextRunTime = this.getNextRunTime(actionModel.getSchedule(), httpCode)
        var nextStatus = this.getNextStatus(actionModel.getSchedule(), httpCode, actionModel.getRetries(), this.maxRetries)
        var retries = this.getRetriesNo(actionModel.getRetries(), nextStatus)
        LogModel.create({
            type: 'AH_RESCHEDULE',
            description: 'nextRunTime: ' + nextRunTime + ', status: ' + nextStatus,
            action_id: actionModel.getId(),
            device_id: actionModel.getDeviceId(),
            area_id: 0
        })
        actionModel.setNextRunTime(nextRunTime)
        actionModel.setRetries(retries)
        actionModel.setStatus(nextStatus)

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

    getNextStatus(schedule, httpCode, retries, maxRetries)
    {
        if(httpCode >= 400){
            if(retries < maxRetries){
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

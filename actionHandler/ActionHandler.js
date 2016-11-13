'use strict'
var ActionModel     = require('db_models/ActionModel')
var LogModel        = require('db_models/LogModel')
var ConfigModel     = require('db_models/ConfigModel')
var Request         = require('util/request')
var Duration        = require('js-joda').Duration

const actionModel = new ActionModel()
class ActionHandler {
    constructor(){
        this.maxRetries = 30
    }

    // main method
    run()
    {
        return new Promise( (resolve, reject) => {
            ConfigModel.setName('AH_RETRIES_NO')
            ConfigModel.readByName()
            .then(config => {
                this.maxRetries = config.getValue()
                return actionModel.readNextAction()
            })
            .then(actionModel => {
                LogModel.create({type: 'AH_RUN', description: 'Setting action status to RUNNING', action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                actionModel.setStatus('RUNNING')
                actionModel.update()

                let ACRequest = new Request('localhost', 3000)
                return this.callController(ACRequest, actionModel)
            })
            .then(ACResponse => {
                LogModel.create({type: 'AH_RUN', description: 'AC returned: '+ACResponse.message, action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                if(ACResponse.httpCode >= 400){
                    reject(ACResponse)
                }
                this.reschedule(actionModel, ACResponse.httpCode)
                    .then(() => {
                        resolve({message: 'Action done and rescheduled.', httpCode: 200, type: 'SUCCESS'})
                    })
                    .catch(reason => {
                        resolve({message: 'Reschedule action failed', httpCode: 400, type: 'ERROR'})
                    })
            })
            .catch(reason => {
                if(reason.message == 'There is no next action available'){
                    resolve({message: 'There is no next action available.', httpCode: 200, type: 'SUCCESS'})
                }else{
                    LogModel.create({type: 'AH_RUN_ERR', description: reason.message, action_id: actionModel.getId(), device_id: actionModel.getDeviceId(), area_id: 0})
                    this.reschedule(actionModel, reason.httpCode)
                    .then(() => {
                        reject(reason)
                    })
                }
            })
        })
    }

    callController(ACRequest, actionModel)
    {
        let path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getId()
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

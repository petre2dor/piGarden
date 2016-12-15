// The Root provides a resolver function for each API endpoint

var Connection      = require('util/connection')
const LogModel      = require('db_models/LogModel')
const ActionModel   = require('db_models/ActionModel')

Connection.init()

let getAction = function(id){
    let action = new ActionModel()
    action.setId(id)

    return new Promise((resolve, reject) => {
        action
            .read()
            .then(action  => resolve(action.getFields()))
            .catch(reason => reject(reason))
    })
}

let createAction = function(params){
    let action = new ActionModel()
    // todo catch validateExceptions for all setters
    action.setDeviceId(params.device_id)
    action.setVerb(params.verb)
    action.setObject(params.object)
    action.setOptions(params.options || '{}')
    action.setNextRunTime(params.next_run_time || null)
    action.setSchedule(params.schedule || '{"type": "fixed"}')
    action.setDescription(params.description || '')
    action.setStatus(params.status || 'INACTIVE')
    return new Promise((resolve, reject) => {
        action
            .insert()
            .then(result => {
                action.reset()
                action.setId(result.insertId)
                return action.read()
            })
            .then(action => resolve(action.getFields()))
            .catch(reason => reject(reason))
    })


    return {id: 11, device_id: 2, object: '42', verb: "2", status: 'bla'}
}


let Root = {
    action: params => getAction(params.id),
    createAction: params => createAction(params)
}
module.exports = Root

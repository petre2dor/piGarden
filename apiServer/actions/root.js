
const ActionModel = require('db_models/ActionModel')

exports.getAction = id => {
    let action = new ActionModel()
    action.setId(id)

    return action
            .read()
            .then(action  => {return action.getFields()})
}

exports.getActions = params => {
    let action = new ActionModel()
    return action
            .get(params)
            .then(actions => {return action.results})
}

exports.createAction = params => {
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
    return action
            .insert()
            .then(result => {
                action.reset()
                action.setId(result.insertId)
                return action.read()
            })
            .then(action => {return action.getFields()})
}

exports.updateAction = params => {
    let action = new ActionModel()
    action.setId(params.id)
    return action
            .read()
            .then(action => {
                if(params.device_id) action.setDeviceId(params.device_id)
                if(params.verb) action.setVerb(params.verb)
                if(params.object) action.setObject(params.object)
                if(params.options) action.setOptions(params.options)
                if(params.next_run_time) action.setNextRunTime(params.next_run_time)
                if(params.schedule) action.setSchedule(params.schedule)
                if(params.description) action.setDescription(params.description)
                if(params.status) action.setStatus(params.status)
                action.setRetries(0)

                return action.update()
            })
            .then(result => {
                action.reset()
                action.setId(params.id)
                return action.read()
            })
            .then(action => {return action.getFields()})
}

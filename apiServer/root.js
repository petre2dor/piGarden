// The Root provides a resolver function for each API endpoint

var Connection      = require('util/connection')
const LogModel      = require('db_models/LogModel')
const ActionModel   = require('db_models/ActionModel')
const StatsModel    = require('db_models/StatsModel')
const LocalDateTime = require('js-joda').LocalDateTime
const ChronoUnit    = require('js-joda').ChronoUnit


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
}

let updateAction = function(params){
    let action = new ActionModel()
    action.setId(params.id)
    return new Promise((resolve, reject) => {
        action
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
            .then(result => resolve(action.getFields()))
            .catch(reason => reject(reason))
    })
}


getGroupByInterval = function(since, until){
    since = LocalDateTime.parse(since)
    until = LocalDateTime.parse(until)
    let diffInMin = since.until(until, ChronoUnit.MINUTES)

    // if diff between dates is bigger than 5 days
    if(diffInMin > 5 * 24 * 60){
        // then group stats per 2 hour interval, in sec
        return 2 * 60 * 60
    // if diff between dates is bigger than 1 day
    }else if(diffInMin > 24 * 60){
        // then group stats per 60 min interval, in sec
        return 60 * 60
    // if diff between dates is bigger than 12 hours
    }else if(diffInMin > 12 * 60){
        // then group stats per 30 min interval, in sec
        return 30 * 60
    // if diff between dates is less than 12 hours
    }else{
        // then group stats per 15 min interval, in sec
        return 15 * 60
    }
}

let getStats = function(params){
    let until = params.until ? params.until : LocalDateTime.now().toString()
    let since = params.since
    let groupByInterval = getGroupByInterval(since, until)
    console.log('groupByInterval', groupByInterval);
    StatsModel.setDeviceId(params.device_id)
    StatsModel.setAreaId(params.area_id)
    StatsModel.setType(params.type)
    return StatsModel
        .get(since, until, groupByInterval)
        .then(stats => {
            return stats.results
        })
}


let Root = {
    action: params => getAction(params.id),
    createAction: params => createAction(params),
    updateAction: params => updateAction(params),
    stats: params => getStats(params)
}
module.exports = Root

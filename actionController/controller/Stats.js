const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')
const LocalDateTime   = require('js-joda').LocalDateTime
const ChronoUnit      = require('js-joda').ChronoUnit

exports.get = function(req, res) {
    let until = req.params.until ? req.params.until : LocalDateTime.now().toString()
    let since = req.params.since
    let groupByInterval = getGroupByInterval(since, until)
    StatsModel.setDeviceId(req.params.deviceId)
    StatsModel
    .get(req.params.since, until, groupByInterval)
    .then(stats => {
        LogModel.create({
                    description: 'Stats since: '+since+', until: '+until+' returned'+' grouped per '+groupByInterval/60+' min interval', 
                    device_id: req.params.deviceId,
                    type: 'GET_STATS',
                    action_id: 0,
                    area_id: 0
                })
        res.send({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Stats since: '+since+', until: '+until+' returned',
                data: stats.results
            })
    })
    .catch(err => {
        LogModel.create({type: 'GET_STATS_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err})
        res.send({
                httpCode: 400,
                type: 'ERROR',
                message: 'There was an error. Please try again.',
                data: err
            })
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

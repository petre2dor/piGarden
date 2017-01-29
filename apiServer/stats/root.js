const StatsModel    = require('db_models/StatsModel')
const LocalDateTime = require('js-joda').LocalDateTime
const ChronoUnit    = require('js-joda').ChronoUnit


getGroupByInterval = (since, until) => {
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
    // if diff between dates is bigger than 1 hour
    }else if(diffInMin > 60){
        // then group stats per 15 min interval, in sec
        return 15 * 60
    // if diff between dates is less than 12 hours
    }else{
        // then group stats per 3 min interval, in sec
        return 3 * 60
    }
}

exports.getLatestStat = params => {
    StatsModel.reset()
    StatsModel.setDeviceId(params.device_id)
    StatsModel.setAreaId(params.area_id)
    StatsModel.setType(params.type)
    return StatsModel
        .getLatestRead()
        .then(stats => { return stats.getFields() })

}

exports.getStats = params => {
    let until = params.until ? params.until : LocalDateTime.now().toString()
    let since = params.since
    let groupByInterval = getGroupByInterval(since, until)
    StatsModel.setDeviceId(params.device_id)
    StatsModel.setAreaId(params.area_id)
    StatsModel.setType(params.type)
    return StatsModel
        .get(since, until, groupByInterval)
        .then(stats => { return stats.results })
}

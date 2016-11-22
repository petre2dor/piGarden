const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')
const LocalDateTime   = require('js-joda').LocalDateTime

exports.get = function(req, res) {
    let until = req.params.until ? req.params.until : LocalDateTime.now().toString()
    let since = req.params.since
    StatsModel.setDeviceId(req.params.deviceId)
    StatsModel
    .get(req.params.since, until)
    .then(stats => {
        LogModel.create({description: 'Stats since: '+since+', until: '+until+' returned', type: 'GET_STATS', action_id: 0, device_id: req.params.deviceId, area_id: 0})
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

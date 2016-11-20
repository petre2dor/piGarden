const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')
const LocalDateTime   = require('js-joda').LocalDateTime

exports.get = function(req, res) {
    let until = req.params.until ? req.params.until : LocalDateTime.now().toString()
    console.log('since ', req.params.since)
    console.log('until ', until)
    console.log('deviceId ', req.params.deviceId)
    // StatsModel.setDeviceId(req.params.deviceId)
    // StatsModel
    // .get(req.params.since, until)
    // .then(stats => {
    //     res.send(stats.results)
    // })
    // .catch(err => {
    //     LogModel.create({type: 'READ_HUMIDITY_ERR', action_id: 0, device_id: req.params.deviceId, area_id: 0, description: err})
    //     res.send({
    //             httpCode: 400,
    //             type: 'ERROR',
    //             message: 'There was an error. Please try again.',
    //             data: err
    //         })
    // })
}

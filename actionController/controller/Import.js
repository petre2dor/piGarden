const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')
const InfluxDB        = require('util/InfluxDB')
const LocalDateTime   = require('js-joda').LocalDateTime
const ChronoUnit      = require('js-joda').ChronoUnit

exports.run = (req, res) => {
    let sql = `SELECT date, value, area_id, device_id, type, ext_data
                FROM stats;`
    StatsModel
        .fetchAll(sql)
        .then(stats => {
            let influxDataPoints = []
            while(stats.getDeviceId()) {
                influxDataPoints.push({
                    measurement: stats.getType(),
                    tags: { device: stats.getDeviceId(), area: stats.getAreaId() },
                    fields: { value: stats.getValue() },
                    timestamp: stats.getDate()
                })

                stats = stats.getNextResult()
            }
            InfluxDB
                .writePoints(influxDataPoints, {precision: 's'})
                .then(() => {
                    res.send({
                        httpCode: 200,
                        type: 'SUCCESS',
                        message: 'Import Done.'
                    })
                })
                .catch(err => {
                    res.send({
                        httpCode: 400,
                        type: 'ERROR',
                        message: `Error saving data to InfluxDB! ${err.stack}`
                    })
                })

        })
}

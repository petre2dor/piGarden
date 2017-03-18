'use strict'

// connect to influx
const Influx = require('influx')
const influx = new Influx.InfluxDB({
    host: '127.0.0.1',
    database: 'piGarden',
    schema: [
        {
            measurement: 'temperature',
            fields: {
                value: Influx.FieldType.INTEGER
            },
            tags: [
                'device',
                'area'
            ]
        }
    ]
})



//connect to mysql
const Connection = require('./util/connection')
Connection.init()
const StatsModel  = require('./db_models/StatsModel')


let sql = `SELECT date, value, area_id, device_id, type, ext_data
            FROM stats;`
console.log('sql ', sql);
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
        influx
            .writePoints(influxDataPoints)
            .catch(err => {
                console.error(`Error saving data to InfluxDB! ${err.stack}`)
            })
        console.log('DONE');
    })

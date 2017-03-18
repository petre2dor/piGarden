// in this file I play with code snippets and ideas

// 'use strict'
// var Duration        = require('js-joda').Duration
// var LocalDateTime   = require('js-joda').LocalDateTime

// obtain a Duration of 10 hours
// console.log(Duration.parse("PT10H")) // "PT10H"


// var dt = LocalDateTime.parse('2012-12-24T12:00')

// console.log(LocalDateTime.now().toString())


// var PythonShell = require('python-shell')
//
// PythonShell.run('devices/scripts/valve/open.py', function (err, results) {
//     if (err) throw err
//     if(results.indexOf('true') === 0) {
//         console.log('true results ', results)
//     } else {
//         console.log('not true results ', results)
//     }
// })

// var v1 =  new Promise((resolve, reject) => {
//     resolve('v1')
// })
//
// var v2 =  new Promise((resolve, reject) => {
//     resolve('v2')
// })
//
// var x;
// v1.then(str => {
//     console.log(str)
//     x = 11
//     console.log(x);
//     return v2
// })
// .then(x1 => {
//     console.log(x)
// })
//  while (true) {
//     console.log("ENV: "+process.env.PI_GARDEN_ENV);
//     console.log("NODE_PATH: "+process.env.NODE_PATH);
//     var Connection      = require('util/connection');
//
// }

//
// var test = function(){
//     return new Promise( (resolve, reject) => {
//         new Promise( (r, rj) => {
//             setTimeout(r, 500)
//         })
//         .then(() => {
//             return new Promise( (r, rj) => {
//                 setTimeout(r, 500)
//             })
//         })
//         .then(() => {
//             new Promise( (r, rj) => {
//                 setTimeout(r, 500)
//             })
//             .then(() => {
//                 resolve('saasa');
//             })
//         })
//     })
// }
//
// var run = function myself () {
//     test()
//     .then(response => {
//         console.log('--response: ', response)
//         myself()
//     })
//     .catch(reason => {
//         console.log('--reason: ', reason)
//         myself()
//     })
// }
//
//
// try {
//     run()
// } catch (e) {
//     throw e
// }

// group by hour and minute
// SELECT date_format(date, "%H %i") AS `Day of the week`, AVG(value) FROM stats  WHERE type = 'TEMPERATURE' AND device_id = 1 AND date >= now() - INTERVAL 3 HOUR GROUP BY `Day of the week` ORDER BY date_format(date, "%H %i");


// group by HOUR
// SELECT date_format(date, "%H") AS `Day of the week`, AVG(value) FROM stats  WHERE type = 'TEMPERATURE' AND device_id = 2 AND date >= now() - INTERVAL 12 HOUR GROUP BY `Day of the week` ORDER BY date_format(date, "%H");


// SELECT
//   DATE_FORMAT(
//     MIN(date),
//     '%d/%m/%Y %H:%i:00'
//   ) AS tmstamp,
//   AVG(value) AS value
// FROM
//   stats
// WHERE device_id = 1 AND date > '2016-11-22T09:07:26'
// GROUP BY ROUND(UNIX_TIMESTAMP(date) / 300)
//
//
//
// var Connection      = require('./util/connection')
// Connection.init()
//
//
// let AreaDeviceModel = require('./db_models/AreaDeviceModel.js')
// areaDevice = new AreaDeviceModel()
// areaDevice.setAreaId(1)
// areaDevice.readAllByAreaId()
// .then(areaDevice => {
//     var i = 0;
//     while (areaDevice.getDeviceId() && i < 15) {
//         i++
//         console.log('result ', areaDevice.getDeviceId())
//         areaDevice = areaDevice.getNextResult()
//         console.log(areaDevice.getDeviceId());
//     }
// })
// .catch(reason => {
//     console.log('reason ', reason)
// })


// pin 18
//
// const Gpio = require('gpio-js')
//
// let led = new Gpio(18, 'out')
// // led ON
// led.val(1)
//
// // after one sec
// setTimeout(() => {
//     // led OFF
//     led.val(0)
// }, 1000)


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

influx.writePoints([{
    measurement: 'temperature',
    tags: { device: 1, area: 1 },
    fields: { value: 24 },
    timestamp: 1487148030
}]).catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
})

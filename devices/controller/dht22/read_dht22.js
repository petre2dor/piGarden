var LogModel    = require('db_models/LogModel')
var DeviceModel = require('db_models/DeviceModel')
var PythonShell = require('python-shell')
var config      = require('config.json')[process.env.PI_GARDEN_ENV]

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        PythonShell.run('controller/dht22/read_dht22.py', {args: [deviceOptions.GPIOpin]}, function (err, results) {
            if (err) {
                reject({ httpCode: 403, type: 'ERROR', message: err.message, data: err })
            } else {
                if(results.indexOf('true') !== 0) {
                    reject({ httpCode: 403, type: 'ERROR', message: 'Valve '+scriptPath+' script failed', data: results })
                } else {
                    resolve({ httpCode: 200, type: 'SUCCESS', message: 'Valve '+scriptPath+' was successfull.' })
                }
            }
        })
    })
}

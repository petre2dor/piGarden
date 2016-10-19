var LogModel    = require('../../../db_models/LogModel.js')
var DeviceModel = require('../../../db_models/DeviceModel')
var PythonShell = require('python-shell')
var config      = require('../../../config.json')[process.env.PI_GARDEN_ENV]

// "mcp-spi-adc":  "^0.3.1",
// var Mcpadc      = require('mcp-spi-adc')

// PythonShell.defaultOptions = { scriptPath: '' }

exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(() => {
            return callReadTempPyScript('controller/temperature/read_tmp36'+config.sufix+'.py')
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(e => {
            res.status(404).json({
                httpCode: 404,
                type: 'ERROR',
                message: e.message,
                data: e
            })
        })
}

getRandomTemperature = function(){
    return Math.floor(Math.random() * (35 - 15) + 15)
}

callReadTempPyScript = function(scriptPath)
{
    return new Promise((resolve, reject) => {
        PythonShell.run(scriptPath, function (err, results) {
            if (err) {
                console.log(err);
                reject({ httpCode: 403, type: 'ERROR', message: err.message, data: err })
            } else {
                if(isNaN(parseFloat(results))) {
                    reject({ httpCode: 403, type: 'ERROR', message: 'Temperature '+scriptPath+' script failed', data: {} })
                } else {
                    resolve({
                        httpCode: 200,
                        type: 'SUCCESS',
                        message: 'Here is the temperature.',
                        data: {temperature: parseFloat(results)}
                    })
                }
            }
        })
    })
}

var LogModel    = require('../../db_models/LogModel.js')
var DeviceModel = require('../../db_models/DeviceModel')
var PythonShell = require('python-shell')

// PythonShell.defaultOptions = { scriptPath: '' }

exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(() => {
            return callReadTempPyScript('scripts/temperature/read_tmp36.py')
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

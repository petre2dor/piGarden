var LogModel    = require('../../db_models/LogModel.js')
var DeviceModel = require('../../db_models/DeviceModel')
var Mcpadc      = require('mcp-spi-adc')

// PythonShell.defaultOptions = { scriptPath: '' }

exports.get = function(req, res) {
    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
    .then(() => {
        return readTemperature()
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

readTemperature = () => {
    return new Promise((resolve, reject) => {
        var tempSensor = Mcpadc.open(1, {speedHz: 20000}, err => {
            if (err) reject({ type: 'ERROR', message: 'Could not open mcpadc.', httpCode: 400, data: err })

            tempSensor.read((err, reading) => {
                if (err) reject({ type: 'ERROR', message: 'Could not read mcpadc.', httpCode: 400, data: err })

                var temperature = (reading.value * 3.3 - 0.5) * 100;
                resolve({ message: 'Here is the temperature.', type: 'SUCCESS', httpCode: 200, data: {temperature: temperature} })
            })
        })
    })
}

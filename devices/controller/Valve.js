var LogModel    = require('../../db_models/LogModel')
var DeviceModel = require('../../db_models/DeviceModel')
var PythonShell = require('python-shell')

PythonShell.defaultOptions = { scriptPath: 'scripts/valve' }

exports.open = function(req, res)
{
    LogModel.create({
        description: 'Open valve', type: 'D_OPEN_VALVE',
        action_id: 0, area_id: 0, device_id: req.params.deviceId
    })

    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(device => {
            // now open the valve
            LogModel.create({description: 'Read device. Calling open.py.', type: 'D_OPEN_VALVE', action_id: 0, area_id: 0, device_id: device.id})
            return callPyScript('open.py')
        })
        .then(result => {
            LogModel.create({description: 'Valve opened successfully', type: 'D_OPEN_VALVE', action_id: 0, area_id: 0, device_id: req.params.deviceId})
            res.status(200).json(result)
        })
        .catch(reason => {
            LogModel.create({description: JSON.stringify(reason), type: 'D_OPEN_VALVE_ERR', action_id: 0, area_id: 0, device_id: req.params.deviceId})
            res.status(404).json(reason)
        })
}

exports.close = function(req, res)
{
    LogModel.create({
        description: 'Close valve', type: 'D_CLOSE_VALVE',
        action_id: 0, area_id: 0, device_id: req.params.deviceId
    })

    var deviceModel = new DeviceModel()
    deviceModel.setId(req.params.deviceId)
    deviceModel.read()
        .then(device => {
            // now open the valve
            LogModel.create({description: 'Read device. Calling close.py.', type: 'D_CLOSE_VALVE', action_id: 0, area_id: 0, device_id: device.id})
            return callPyScript('close.py')
        })
        .then(result => {
            LogModel.create({description: 'Valve closed successfully', type: 'D_CLOSE_VALVE', action_id: 0, area_id: 0, device_id: req.params.deviceId})
            res.status(200).json(result)
        })
        .catch(reason => {
            LogModel.create({description: JSON.stringify(reason), type: 'D_CLOSE_VALVE_ERR', action_id: 0, area_id: 0, device_id: req.params.deviceId})
            res.status(404).json(reason)
        })
}

callPyScript = function(scriptPath)
{
    // now open the valve
    return new Promise((resolve, reject) => {
        PythonShell.run(scriptPath, function (err, results) {
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

const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')
const AreaDeviceModel = require('db_models/AreaDeviceModel')
const LocalDateTime   = require('js-joda').LocalDateTime
const ChronoUnit      = require('js-joda').ChronoUnit

exports.persistDeviceRead = function(deviceId, type, value) {

    areaDevice = new AreaDeviceModel()
    areaDevice.setDeviceId(deviceId)
    areaDevice.readAllByDeviceId()
    .then(areaDevice => {
        while (areaDevice.getAreaId()) {
            LogModel.create({type: 'PERSIST_DEVICE_READ', action_id: 0, device_id: deviceId, area_id: areaDevice.getAreaId(), description: 'saving ' + type + ": " + value
        })
            StatsModel.create({area_id: areaDevice.getAreaId(), device_id: deviceId, type: type, value: value})
            areaDevice = areaDevice.getNextResult()
        }
    })
    .catch(reason => {
        LogModel.create({type: 'PERSIST_DEVICE_READ_ERR', action_id: 0, device_id: deviceId, area_id: 0, description: reason})
    })
}

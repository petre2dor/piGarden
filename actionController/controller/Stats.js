var LogModel    = require('db_models/LogModel')
var DeviceModel = require('db_models/DeviceModel')
var AreaDeviceModel = require('db_models/AreaDeviceModel')
var StatsModel  = require('db_models/StatsModel')

exports.save = function(deviceModel, value) {
    let device = new DeviceModel()
    device.setId(deviceModel.getId());
    device.read()
    .then(device => {
})

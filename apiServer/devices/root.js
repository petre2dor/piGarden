
const DeviceModel   = require('db_models/DeviceModel')

exports.getDevice = id => {
    let device = new DeviceModel()
    device.setId(id)
    return device
            .read()
            .then(device  => {return device.getFields()})
}

exports.getDevices = params => {
    let devices = new DeviceModel()
    return devices
            .get(params)
            .then(devicess => {return devices.results})
}

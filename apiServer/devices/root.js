
const DeviceModel = require('db_models/DeviceModel')

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

exports.createDevice = params => {
    let device = new DeviceModel()
    // todo catch validateExceptions for all setters
    device.setName(params.name)
    device.setType(params.type)
    device.setDescription(params.description || '')
    device.setStatus(params.status || 'INACTIVE')
    device.setOptions(params.options || '{}')
    return device
            .insert()
            .then(result => {
                device.reset()
                device.setId(result.insertId)
                return device.read()
            })
            .then(action => {return action.getFields()})
}

exports.updateDevice = params => {
    let device = new DeviceModel()
    device.setId(params.id)
    return device
            .read()
            .then(device => {
                if(params.name) device.setName(params.name)
                if(params.type) device.setType(params.type)
                if(params.description) device.setDescription(params.description)
                if(params.status) device.setStatus(params.status)
                if(params.options) device.setOptions(params.options)

                return device.update()
            })
            .then(result => {
                device.reset()
                device.setId(params.id)
                return device.read()
            })
            .then(device => {return device.getFields()})
}

const Utilities = require('util/utilities.js')
const Gpio      = require('gpio-js')

exports.write = deviceOptions => {
    return new Promise((resolve, reject) => {
        let led = new GPIO(deviceOptions.GPIOpin, 'out')
        led.val(deviceOptions.value)

        setTimeout(() => {
            led.val(1 - deviceOptions.value)
        }, 1000)

        resolve({
            message: 'Successfuly wrote to gpio pin '+deviceOptions.GPIOpin+" value "+deviceOptions.value,
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "GPIO_WRITE", "value": deviceOptions.value}]
        })
    })
}

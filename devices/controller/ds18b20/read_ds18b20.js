const Utilities = require('util/utilities.js')
const sensor    = require('ds18b20-raspi')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        let temperature = sensor.readC(deviceOptions.id);
        resolve({
            message: 'Here is the temperature.',
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "TEMPERATURE", "value": temperature}]
        })
    })
}

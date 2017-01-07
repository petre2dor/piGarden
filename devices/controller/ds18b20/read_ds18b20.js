const sensor = require('ds18b20-raspi')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        let temperature = sensor.readSimpleC()
        resolve({
            message: 'Here is the temperature.',
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "TEMPERATURE", "value": temperature}]
        })
    })
}

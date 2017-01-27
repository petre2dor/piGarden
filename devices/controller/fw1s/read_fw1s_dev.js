const Util      = require('util/utilities')

exports.read = deviceOptions => {
    let readValue = Math.random()
    readValue = (readValue < 0.3) ? 0.3 : readValue
    let humidity = Util.map_range(readValue, 1, 0.3, 0, 100)

    return new Promise((resolve, reject) => {
        resolve({
            message: 'Here is the mock humidity.',
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "HUMIDITY", "value": humidity}]
        })
    })
}

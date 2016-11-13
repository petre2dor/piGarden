const Mcpadc    = require('mcp-spi-adc')
const Util      = require('util/utilities')

exports.readHumidity = () => {
    let readValue = Math.random()
    readValue = (readValue < 0.3) ? 0.3 : readValue
    let humidity = Util.map_range(readValue, 1, 0.3, 0, 100)

    return new Promise((resolve, reject) => {
        resolve({
            message: 'Here is the humidity.',
            type: 'SUCCESS',
            httpCode: 200,
            data: {humidity: humidity}
        })
    })
}

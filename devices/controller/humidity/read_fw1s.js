const Mcpadc    = require('mcp-spi-adc')
const Util      = require('util/utilities')

exports.readHumidity = () => {
    return new Promise((resolve, reject) => {
        let tempSensor = Mcpadc.open(0, {speedHz: 20000}, err => {
            if (err) reject({ type: 'ERROR', message: 'Could not open mcpadc.', httpCode: 400, data: err })

            tempSensor.read((err, reading) => {
                if (err) reject({ type: 'ERROR', message: 'Could not read mcpadc.', httpCode: 400, data: err })
                // map read value to from range 1(no humidity) - 0.3(max humidity) to range 0 - 100
                let humidity = Util.map_range(reading.value, 1, 0.3, 0, 100);
                resolve({ message: 'Here is the humidity.', type: 'SUCCESS', httpCode: 200, data: {humidity: humidity} })
            })
        })
    })
}

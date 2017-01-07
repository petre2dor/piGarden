const Mcpadc = require('mcp-spi-adc')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        var tempSensor = Mcpadc.open(1, {speedHz: 20000}, err => {
            if (err) reject({ type: 'ERROR', message: 'Could not open mcpadc.', httpCode: 400, data: err })

            tempSensor.read((err, reading) => {
                if (err) reject({ type: 'ERROR', message: 'Could not read mcpadc.', httpCode: 400, data: err })

                var temperature = (reading.value * 3.3 - 0.5) * 100;
                resolve({
                    message: 'Here is the temperature.',
                    type: 'SUCCESS',
                    httpCode: 200,
                    data: [{"type": "TEMPERATURE", "value": temperature}]
                })
            })
        })
    })
}

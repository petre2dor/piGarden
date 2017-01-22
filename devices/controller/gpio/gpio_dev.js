var PythonShell = require('python-shell')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        PythonShell.run('controller/dht22/gpio_dev.py', {args: [deviceOptions.GPIOpin, deviceOptions.value]}, (err, results) => {
            if (err) {
                reject({ httpCode: 403, type: 'ERROR', message: err.message, data: err })
            } else {
                let result = JSON.parse(results[0])

                if(result.httpCode >= '400') {
                    reject({ httpCode: 403, type: 'ERROR', message: 'Write to gpio  pin '+deviceOptions.GPIOpin+', value '+deviceOptions.value+' failed', data: result.message })
                } else {
                    resolve(result)
                }
            }
        })
    })
}

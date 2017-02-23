var PythonShell = require('python-shell')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        PythonShell.run('controller/sht1x/read_dev.py', {args: [deviceOptions.dataPin, deviceOptions.clockPin]}, (err, results) => {
            if (err) {
                reject({ httpCode: 403, type: 'ERROR', message: err.message, data: err })
            } else {
                let result = JSON.parse(results[0])

                if(result.httpCode >= '400') {
                    reject({ httpCode: 403, type: 'ERROR', message: 'Read dht22 script failed', data: result.message })
                } else {
                    resolve(result)
                }
            }
        })
    })
}

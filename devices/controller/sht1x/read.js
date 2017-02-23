var PythonShell = require('python-shell')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        PythonShell.run('controller/sht1x/read.py', {args: [deviceOptions.dataPin, deviceOptions.clockPin]}, (err, results) => {
            let result = err
                            ? { httpCode: 403, type: 'ERROR', message: err.message, data: err }
                            : JSON.parse(results[0])

            if(result.httpCode >= '400') {
                reject({ httpCode: 403, type: 'ERROR', message: 'Read sht1x script failed', data: result.message })
            } else {
                resolve(result)
            }
        })
    })
}

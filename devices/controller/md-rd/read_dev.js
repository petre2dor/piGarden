var PythonShell = require('python-shell')

exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        PythonShell.run('controller/md-rd/read_dev.py', {args: [deviceOptions.GPIOpin]}, (err, results) => {
            let result = err
                            ? { httpCode: 403, type: 'ERROR', message: err.message, data: err }
                            : JSON.parse(results[0])

            if(result.httpCode >= '400') {
                reject({ httpCode: 403, type: 'ERROR', message: 'Read dht22 script failed', data: result.message })
            } else {
                resolve(result)
            }
        })
    })
}

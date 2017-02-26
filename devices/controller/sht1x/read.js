const os = require('os')
const spawn = require('child_process').spawn

exports.read = deviceOptions => {
    let getDataFromOutput = output => {
        let multiline = output.split(os.EOL)
        let temperature, rh, dew_point = null
        multiline.forEach(element => {
            let line = element.split(':')
            switch (line[0].trim()) {
                case 'temperature':
                    temperature = line[1].trim()
                    break;
                case 'rh':
                    rh = line[1].trim()
                    break;
                case 'dew_point':
                    dew_point = line[1].trim()
                    break;
            }
        })

        return [{"type": "TEMPERATURE", "value": temperature}, {"type": "HUMIDITY", "value": rh}, {"type": "DEW", "value": dew_point}]
    }


    let APICall = spawn('sht', ['-v', '-trd', deviceOptions.clockPin, deviceOptions.dataPin])
    let APIOutput = ''
    if (typeof APICall != "undefined") {
        APICall.stdout.on('data', data => {
            console.log('backend: ' + data)
            APIOutput += data
        })
        APICall.stderr.on('data', data => {
            console.log('backend: ' + data)
            APIOutput += data
        })

        return new Promise((resolve, reject) => {
            APICall.on('close', code => {
                console.log('exitcode: ' + code)
                console.log('output: ' + APIOutput)

                resolve({ httpCode: 200, type: 'SUCCESS', data: getDataFromOutput(APIOutput), message: 'Read sht10 successfuly from dataPin: '+deviceOptions.dataPin+', clockPin: '+deviceOptions.clockPin})
            });
            APICall.on('error', code => {
                console.log('errorcode: ' + code)
                reject({
                        httpCode: 403,
                        type: 'ERROR',
                        message: 'Error reading sht10 from dataPin: '+deviceOptions.dataPin+', clockPin: '+deviceOptions.clockPin,
                        data: 'exitcode: ' + code + ' output: ' + APIOutput
                    })
            })
        })
    }
}

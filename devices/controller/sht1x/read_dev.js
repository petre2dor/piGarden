
exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        resolve({httpCode: 200, type: 'SUCCESS', data: [{"type": "TEMPERATURE", "value": "22"}, {"type": "HUMIDITY", "value": "45"}, {"type": "DEW", "value": "8"}], message: 'Read sht10 successfuly from dataPin: '+deviceOptions.dataPin+', clockPin: '+deviceOptions.clockPin})
    })
}

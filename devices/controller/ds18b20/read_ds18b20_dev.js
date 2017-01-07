// mock temperature for dev env with a random value
exports.read = deviceOptions => {
    return new Promise((resolve, reject) => {
        resolve({
            message: 'Here is the mock temperature.',
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "TEMPERATURE", "value": Math.floor(Math.random() * (35 - 0) + 0)}]
        })
    })
}



exports.readTemperature = () => {
    return new Promise((resolve, reject) => {
        resolve({
            message: 'Here is the mock temperature.',
            type: 'SUCCESS',
            httpCode: 200,
            data: {temperature: Math.floor(Math.random() * (35 - 0) + 0)}
        })
    })
}

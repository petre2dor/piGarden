// mock write to gpio pin
exports.write = deviceOptions => {
    return new Promise((resolve, reject) => {
        resolve({
            message: 'Successfuly wrote to gpio pin '+deviceOptions.GPIOpin+" value "+deviceOptions.value,
            type: 'SUCCESS',
            httpCode: 200,
            data: [{"type": "GPIO_WRITE", "value": deviceOptions.value}]
        })
    })
}

var LogModel    = require('../../db_models/LogModel.js')
// var log = new LogModel()

exports.get = function(req, res) {
    LogModel.create({
        action_id: 0,
        area_id: req.params.areaId,
        device_id: 42,
        type: 'D_GET_TEMPERATURE',
        description: 'Get mock temperature from device'
    })

    // var tempFileContents = fs.readFileSync('/sys/bus/i2c/drivers_autoprobe')
    // console.log('temp: ' + tempFileContents)

    res.status(200).json({
        httpCode: 200,
        type: 'SUCCESS',
        message: 'Here is the temperature',
        data: {temperature: Math.floor(Math.random() * (35 - 22) + 22)}
    })
}

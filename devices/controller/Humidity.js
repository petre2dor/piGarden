var LogModel    = require('../../db_models/LogModel.js')

exports.get = function(req, res) {
    LogModel.create({
        action_id: 0,
        area_id: req.params.areaId,
        device_id: 42,
        type: 'D_GET_HUMIDITY',
        description: 'Get mock humidity from device'
    })

    res.status(200).json({
        httpCode: 200,
        type: 'SUCCESS',
        message: 'Here is the humidity',
        data: {humidity: Math.floor(Math.random() * (77 - 65) + 65)}
    })
}

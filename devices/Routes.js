var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')

var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/temperature/:areaId',function(req,res) {
            log.create({area_id: req.params.areaId, device_id: 42, type: 'D_GET_TEMPERATURE', description: 'Get mock temperature from device'})

            res.send(
                {
                    httpCode: 200,
                    type: 'SUCCESS',
                    message: 'Here is the temperature',
                    data: {temperature: Math.floor(Math.random() * (35 - 22) + 22)}
                }
            )
        }),
        app.get('/humidity/:areaId',function(req,res) {
            log.create({area_id: req.params.areaId, device_id: 84, type: 'D_GET_HUMIDITY', description: 'Get mock humidity from device'})

            res.send(
                {
                    httpCode: 200,
                    type: 'SUCCESS',
                    message: 'Here is the humidity',
                    data: {humidity: Math.floor(Math.random() * (77 - 65) + 65)}
                }
            )
        })
    }

}

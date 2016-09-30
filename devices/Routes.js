var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')
var Temperature = require('./controller/Temperature.js')
var fs          = require('fs')

// var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/temperature/:areaId', Temperature.get)
        app.get('/humidity/:areaId', function(req,res) {
            log.create({action_id: 0, area_id: req.params.areaId, device_id: 84, type: 'D_GET_HUMIDITY', description: 'Get mock humidity from device'})

            res.status(200).json({
                httpCode: 200,
                type: 'SUCCESS',
                message: 'Here is the humidity',
                data: {humidity: Math.floor(Math.random() * (77 - 65) + 65)}
            })
        })
    }
}

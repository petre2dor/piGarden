var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')
var Request     = require('../util/request.js')

var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/read/temperature/:areaId',function(req,res) {
            var request = new Request('localhost', 3001)

            request.get('/temperature/1')
                .then((response) => {
                    log.create({area_id: req.params.areaId, device_id: 0, type: 'READ_TEMPERATURE', description: JSON.stringify(response)})
                    
                    res.send(
                        {
                            httpCode: 200,
                            type: 'SUCCESS',
                            message: 'Temperature read successfully.'
                        }
                    )
                },(err) => {
                    console.log(err)
                    log.create({area_id: req.params.areaId, device_id: 0, type: 'READ_TEMPERATURE_ERR', description: err})
                    res.send(
                        {
                            httpCode: 400,
                            type: 'ERROR',
                            message: 'There was an error. Please try again.',
                            data: err
                        }
                    )
                })
        }),

        app.get('/read/humidity/:areaId',function(req,res) {
            var request = new Request('localhost', 3001)

            request.get('/humidity/2')
                .then((response) => {
                    log.create({area_id: req.params.areaId, device_id: 0, type: 'READ_HUMIDITY', description: JSON.stringify(response)})
                    res.send(
                        {
                            httpCode: 200,
                            type: 'SUCCESS',
                            message: 'Humidity read successfully.'
                        }
                    )
                },(err) => {
                    log.create({area_id: req.params.areaId, device_id: 0, type: 'READ_HUMIDITY_ERR', description: err})
                    res.send(
                        {
                            httpCode: 400,
                            type: 'ERROR',
                            message: 'There was an error. Please try again.',
                            data: err
                        }
                    )
                })
        })


    }
}

var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')
var StatsModel  = require('../db_models/StatsModel.js')
var Request     = require('../util/request.js')

var log = new LogModel()
var stats = new StatsModel()

module.exports = {
    configure: function(app) {
        app.get('/read/temperature/:areaId',function(req,res) {
            var request = new Request('localhost', 3001)

            request.get('/temperature/1')
                .then((response) => {
                    log.create({action_id: 0, area_id: req.params.areaId, device_id: 0, type: 'READ_TEMPERATURE', description: JSON.stringify(response)})
                    stats.create({type: 'TEMPERATURE', value: response.data.temperature})
                    res.send(
                        {
                            httpCode: 200,
                            type: 'SUCCESS',
                            message: 'Temperature read successfully.'
                        }
                    )
                },(err) => {
                    console.log(err)
                    log.create({action_id: 0, area_id: req.params.areaId, device_id: 0, type: 'READ_TEMPERATURE_ERR', description: err})
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
                    log.create({action_id: 0, area_id: req.params.areaId, device_id: 0, type: 'READ_HUMIDITY', description: JSON.stringify(response)})
                    stats.create({type: 'HUMIDITY', value: response.data.humidity})
                    res.send(
                        {
                            httpCode: 200,
                            type: 'SUCCESS',
                            message: 'Humidity read successfully.'
                        }
                    )
                },(err) => {
                    log.create({action_id: 0, area_id: req.params.areaId, device_id: 0, type: 'READ_HUMIDITY_ERR', description: err})
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

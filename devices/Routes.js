var Connection  = require('../util/connection')
var LogModel    = require('../db_models/LogModel')
var Temperature = require('./controller/Temperature')
var Humidity    = require('./controller/Humidity')
var fs          = require('fs')

// var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/temperature/:areaId', Temperature.get)
        app.get('/humidity/:areaId', Humidity.get)
    }
}

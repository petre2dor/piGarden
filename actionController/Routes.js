var Temperature     = require('actionController/controller/Temperature')
var Humidity        = require('actionController/controller/Humidity')
var Valve           = require('actionController/controller/Valve')
var Stats           = require('actionController/controller/Stats')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

module.exports = {
    configure: function(app) {
        app.get('/read/humidity/:deviceId', Humidity.read)
        app.get('/read/temperature/:deviceId', Temperature.read)
        app.get('/open/valve/:deviceId', Valve.open)
        app.get('/close/valve/:deviceId', Valve.close)

        app.get('/stats/:deviceId/:since', Stats.get)
        // app.get('/stats/:deviceId/:since/:until', Stats.get)
    }
}

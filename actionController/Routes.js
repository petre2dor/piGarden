var Temperature     = require('actionController/controller/Temperature')
var Humidity        = require('actionController/controller/Humidity')
var Valve        = require('actionController/controller/Valve')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

module.exports = {
    configure: function(app) {
        app.get('/read/temperature/:actionId', Temperature.read)
        app.get('/read/humidity/:actionId', Humidity.read)

        app.get('/open/valve/:actionId', Valve.open)

        app.get('/close/valve/:actionId', Valve.close)

    }
}

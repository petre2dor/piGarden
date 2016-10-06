var Temperature     = require('./controller/Temperature')
var Humidity        = require('./controller/Humidity')
var Valve        = require('./controller/Valve')
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

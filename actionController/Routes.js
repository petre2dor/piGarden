var Devices          = require('actionController/controller/Devices')
var Valve           = require('actionController/controller/Valve')
var Stats           = require('actionController/controller/Stats')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

module.exports = {
    configure: function(app) {
        app.get('/read/:deviceId', Devices.read)
        app.get('/write/:deviceId', Devices.write)
        app.get('/open/valve/:deviceId', Valve.open)
        app.get('/close/valve/:deviceId', Valve.close)
    }
}

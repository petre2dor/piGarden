var Devices         = require('actionController/controller/Devices')
var Valve           = require('actionController/controller/Valve')
var Stats           = require('actionController/controller/Stats')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration
var Import          = require('actionController/controller/Import')

module.exports = {
    configure: function(app) {
        app.get('/read/:deviceId', Devices.read)
        app.get('/blink/:deviceId', Devices.blink)
        app.get('/open/valve/:deviceId', Valve.open)
        app.get('/close/valve/:deviceId', Valve.close)
        app.get('/influxDBImport', Import.run)
        app.post('/receive/:deviceId', Devices.receive)
    }
}

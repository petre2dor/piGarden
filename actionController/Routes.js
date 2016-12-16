var ReadDevice      = require('actionController/controller/ReadDevice')
var Valve           = require('actionController/controller/Valve')
var Stats           = require('actionController/controller/Stats')
var LocalDateTime   = require('js-joda').LocalDateTime
var Duration        = require('js-joda').Duration

module.exports = {
    configure: function(app) {
        app.get('/read/:deviceId', ReadDevice.read)
        app.get('/open/valve/:deviceId', Valve.open)
        app.get('/close/valve/:deviceId', Valve.close)
    }
}

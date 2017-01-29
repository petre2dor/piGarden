// The Root provides a resolver function for each API endpoint

var Connection      = require('util/connection')
const ActionsRoot   = require('./actions/root')
const DevicesRoot   = require('./devices/root')
const StatsRoot     = require('./stats/root')

Connection.init()

let Root = {
    action:         params => ActionsRoot.getAction(params.id),
    actions:        params => ActionsRoot.getActions(params),
    createAction:   params => ActionsRoot.createAction(params),
    updateAction:   params => ActionsRoot.updateAction(params),
    device:         params => DevicesRoot.getDevice(params.id),
    devices:        params => DevicesRoot.getDevices(params),
    createDevice:   params => DevicesRoot.createDevice(params),
    updateDevice:   params => DevicesRoot.updateDevice(params),
    latestStat:     params => StatsRoot.getLatestStat(params),
    stats:          params => StatsRoot.getStats(params)
}
module.exports = Root

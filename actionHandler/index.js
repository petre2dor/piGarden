'use strict'
// const MODEL_PATH = 'db_models/'
var Request         = require('../util/request.js')
var Connection      = require('../util/connection');
var LogModel        = require('../db_models/LogModel.js')
var ActionHandler   = require('./ActionHandler.js')

try {
    Connection.init();
    var logModel = new LogModel()
    logModel.create({area_id: 0, device_id: 0, type: 'ACTION_HANDLER_START', description: 'Start ActionHandler'})

    var actionHandler = new ActionHandler();
    actionHandler.run()

    var logModel = new LogModel()
    logModel.create({area_id: 0, device_id: 0, type: 'ACTION_HANDLER_END', description: 'End ActionHandler'})
} catch (e) {
    throw e
    // logModel.create({area_id: 0, device_id: 0, type: 'ACTION_RUNNER_ERR', description: e})
} finally {
    console.log('---finally---')
}

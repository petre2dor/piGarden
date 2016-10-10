'use strict'
// const MODEL_PATH = 'db_models/'
var Request         = require('../util/request.js')
var Connection      = require('../util/connection');
var LogModel        = require('../db_models/LogModel')
var ActionHandler   = require('./ActionHandler')

process.title = "piGarden-AH"


try {
    Connection.init();

    LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'ACTION_HANDLER_START', description: 'Start ActionHandler'})
    ActionHandler.run()
    // var actionHandler = new ActionHandler()
    // actionHandler.initAndRun()

    LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'ACTION_HANDLER_END', description: 'End ActionHandler'})
} catch (e) {
    throw e
    // LogModel.create({area_id: 0, device_id: 0, type: 'ACTION_RUNNER_ERR', description: e})
}

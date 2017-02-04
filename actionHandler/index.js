'use strict'

var Request         = require('util/request.js')
var Connection      = require('util/connection');
var LogModel        = require('db_models/LogModel')
var ActionHandler   = require('actionHandler/ActionHandler')
const delay         = 1000 // 1 sec
process.title = "piGarden-AH"

var run = function myself () {
    ActionHandler
        .getActionAndSetRunning()
        .then(actionModel => {
            // launch it and don't wait for result
            ActionHandler.run(actionModel)
            // start over
            setTimeout(myself, delay)
        })
        .catch(reason => {
            reason === 404
                ? LogModel.create({type: 'AH_RUN', description: '---', action_id: 0, area_id: 0, device_id: 0}) //no action found
                : LogModel.create({type: 'AH_RUN_ERR', description: reason, action_id: 0, area_id: 0, device_id: 0}) //unexpected error
            // start over
            setTimeout(myself, delay)
        })
}

try {
    Connection.init();
    LogModel.create({action_id: 0, area_id: 0, device_id: 0, type: 'AH_START', description: 'Start ActionHandler'})
    run()
} catch (e) {
    LogModel.create({area_id: 0, device_id: 0, type: 'AH_ERR', description: e})
    throw e
}

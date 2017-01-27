'use strict'

var Request         = require('util/request.js')
var Connection      = require('util/connection');
var LogModel        = require('db_models/LogModel')
var ActionHandler   = require('actionHandler/ActionHandler')

process.title = "piGarden-AH"

var run = function myself () {
    ActionHandler
        .getActionAndSetRunning()
        .then(actionModel => {
            // run the action without waiting for it to finish
            if(actionModel.getFields()) ActionHandler.run(actionModel)

            LogModel.create({type: 'AH_RUN', description: '---', action_id: 0, area_id: 0, device_id: 0})
            setTimeout(myself, 1000)
        })
        .catch(reason => {
            LogModel.create({type: 'AH_RUN_ERR', description: reason.message, action_id: 0, area_id: 0, device_id: 0})
            setTimeout(myself, 1000)
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

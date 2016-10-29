'use strict'
// const MODEL_PATH = 'db_models/'
var Request         = require('../util/request.js')
var Connection      = require('../util/connection');
var LogModel        = require('../db_models/LogModel')
var ActionHandler   = require('./ActionHandler')

process.title = "piGarden-AH"

var run = function myself () {
    ActionHandler
        .run()
        .then(response => {
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

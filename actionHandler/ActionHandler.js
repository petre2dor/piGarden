'use strict'
var ActionModel = require('../db_models/ActionModel.js')

class ActionHandler {
    constructor(conn, logModel) {
        this.actionModel    = new ActionModel(conn)
        this.logModel       = logModel;
        this.stop = false
        logModel.create({type: 'ACTION_HANDLER_INIT', description: 'ActionHandler initialized'})
        this.request = new Request('localhost', 3000)
    }

    run() {
        while (!this.stop) {
            this.actionModel.readNextAction(this.callController)
        }
    }

    callController(action){
        //call to controller
        device.get('/', (data) => {
            console.log('index: ')
            console.log(data)
        })

        //analyze controller response
        //reschedule this action
    }

    reschedule(action, controller_response){

    }
}

module.exports = ActionHandler

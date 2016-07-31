'use strict'
var ActionModel = require('../db_models/ActionModel.js')
var Request = require('../util/request.js')

class ActionHandler {
    constructor(conn, logModel) {
        this.actionModel    = new ActionModel(conn)
        this.logModel       = logModel;
        this.stop = 42
        this.logModel.create({type: 'ACTION_HANDLER_INIT', description: 'ActionHandler initialized'})
        this.request = new Request('date.jsontest.com', 80)
    }

    run() {
        this.actionModel.readNextAction()
        .then(() => {
                return this.callController()
            }, (err) => {
                console.log('err: ', err)
            })
        .then((result) => {
            this.reschedule(result)
        })
    }

    callController(){
        //call to controller
        return new Promise((resolve, reject) => {
            this.request.get('/', (result) => {
                resolve(result)
            })
        })
    }

    reschedule(controller_response){
        // this.actionModel.setNextRunTime('2016-07-31T19:48:11.000Z')
        // this.actionModel.setNextRunTime('2016-07-30 00:00:00')
        this.actionModel.setAreaId(42);
        this.actionModel.update()
        console.log('VERB ', this.actionModel.getSchedule())
        // console.log('result ', controller_response)
    }
}

module.exports = ActionHandler

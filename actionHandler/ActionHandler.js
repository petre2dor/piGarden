'use strict'
var LocalDateTime = require('js-joda').LocalDateTime;
var ActionModel = require('../db_models/ActionModel.js')
var Request = require('../util/request.js')

class ActionHandler {
    constructor(logModel) {
        this.actionModel    = new ActionModel()
        this.logModel       = logModel;
        this.stop           = 42
        this.request        = new Request('date.jsontest.com', 80)
        this.logModel.create({area_id: 0, device_id: 0, type: 'ACTION_HANDLER_INIT', description: 'ActionHandler initialized'})
    }

    run() {
        console.log('RUN FOREST! RUUUN!!!!')
        this.actionModel.readNextAction()
        .then((actionModel) => {
                console.log('set status RUNNING');
                actionModel.setStatus('RUNNING')
                actionModel.update().then(() => {
                    setTimeout(() => {
                        this.run()
                    }, 2000)
                })
                return this.callController(actionModel)
            }, (err) => {
                console.log(err + '. sleep 5s');
                setTimeout(() => {
                    this.run()
                }, 5000)
            })
        .then((result) => {
            var actionModel = result[0]
            var controllerResponse = result[1]
            this.reschedule(actionModel, controllerResponse)
        })
    }

    callController(actionModel){
        //call to controller
        return new Promise((resolve, reject) => {
            this.request.get('/', (controllerResponse) => {
                resolve([actionModel, controllerResponse])
            })
        })
    }

    reschedule(actionModel, controllerResponse){
        actionModel.setNextRunTime(LocalDateTime.now().plusSeconds(60).toString())
        actionModel.setStatus('ACTIVE')
        actionModel.update()
        .then((result) => {
            // console.log('update result ', result);
        },(err) => {
            throw err
            // console.log('update err ', err);
        })
    }
}

module.exports = ActionHandler

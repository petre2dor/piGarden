'use strict'
var LocalDateTime = require('js-joda').LocalDateTime;
var ActionModel = require('../db_models/ActionModel')
var LogModel    = require('../db_models/LogModel')
var Request     = require('../util/request')

class ActionHandler {
    constructor() {
        this.logModel       = new LogModel()
        this.actionModel    = new ActionModel()
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
                console.log(err + '. Sleep 5s');
                setTimeout(() => {
                    this.run()
                }, 5000)
            })
        .then((result) => {
            if ( typeof result !== 'undefined' && result ){
                console.log('second then!!!!!!!!!!!!!!!!!!!!!!!!!')
                var actionModel = result[0]
                console.log('actionModel ', actionModel)
                var controllerResponse = result[1]
                this.reschedule(actionModel, controllerResponse)
            }
        })
    }

    callController(actionModel){
        console.log('callController ', actionModel);
        //call to controller
        return new Promise((resolve, reject) => {
            this.request.get('/', (controllerResponse) => {
                resolve([actionModel, controllerResponse])
            })
        })
    }

    reschedule(actionModel, controllerResponse){
        // console.log('actionModel.getSchedule() ', actionModel.getSchedule())
        // var sec = actionModel.getSchedule().every || 12
        // console.log('Run this after ' + sec + ' seconds')
        console.log('Run this after 15 seconds')
        actionModel.setNextRunTime(LocalDateTime.now().plusSeconds(15).toString())
        actionModel.setStatus('ACTIVE')
        actionModel.update()
        .then((result) => {
            // console.log('update result ', result);
            return true
        },(err) => {
            throw err
            // console.log('update err ', err);
        })
    }
}

module.exports = ActionHandler

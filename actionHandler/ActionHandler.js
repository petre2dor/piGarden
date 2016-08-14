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
        this.request        = new Request('localhost', 3000)
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
                console.log('second then!!!!!!!!!!!!!!!!!!!!!!!!!')
                console.log(result)
                var actionModel = result[0]
                console.log('actionModel ', actionModel)
                var controllerResponse = result[1]
                this.reschedule(actionModel, controllerResponse)
            },(err) => {
                console.log('second then err', err);
            })
    }

    callController(actionModel){
        //call to controller
        return new Promise((resolve, reject) => {
            var path = '/'+actionModel.getVerb()+'/'+actionModel.getObject()+'/'+actionModel.getAreaId()
            console.log('path ', path)
            this.request.get(path).then((controllerResponse) => {
                    resolve([actionModel, controllerResponse])
                },
                (reason) => {
                    console.log('Handle rejected promise ('+reason+') here.')
                })
        })
    }

    reschedule(actionModel, controllerResponse){
        var sec = actionModel.getSchedule().start.every || 60 //default run after 1 min
        console.log('Run this after ' + actionModel.getSchedule().start.every + ' seconds')
        actionModel.setNextRunTime(LocalDateTime.now().plusSeconds(sec).toString())
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

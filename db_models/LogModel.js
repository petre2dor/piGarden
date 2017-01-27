'use strict'
var PrimaryModel = require('db_models/PrimaryModel.js')

class LogModel extends PrimaryModel {
    setId(val){
        this.fields.id = val
    }
    setActionId(val){
        this.fields.action_id = val
    }
    setAreaId(val){
        this.fields.area_id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setType(val){
        this.fields.type = val
    }
    setDescription(val){
        this.fields.description = val
    }

    getInsertStmt(){
        return `INSERT INTO logs(action_id, area_id, device_id, type, description)
                VALUES (:action_id, :area_id, :device_id, :type, :description)`
    }
    create(fields){
        console.log(fields.type+': ' + fields.description+'; action_id: ' +fields.action_id);
        super.create(fields)
    }
}
var log = new LogModel()
module.exports = log

'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class LogModel extends PrimaryModel {
    setId(val){
        this.fields.id = val
    }
    setAreaId(val){
        this.fields.area_id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setType(val){
        // this.type = val.toUpperCase()
        this.fields.type = val
    }
    setDescription(val){
        this.fields.description = val
    }

    getInsertStmt(){
        return 'INSERT INTO logs SET ?'
    }
}

module.exports = LogModel

'use strict'
var PrimaryModel = require('db_models/PrimaryModel.js')

class StatsModel extends PrimaryModel {
    setAreaId(val){
        this.fields.area_id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setType(val){
        this.fields.type = val
    }
    setValue(val){
        this.fields.value = val
    }
    setExtData(val){
        this.fields.ext_data = JSON.stringify(val)
    }
    setStatus(val){
        this.fields.status = val
    }

    getAreaId(){
        return this.fields.area_id
    }
    getDeviceId(){
        return this.fields.device_id
    }
    getType(){
        return this.fields.type
    }
    getValue(){
        return this.fields.value
    }
    getExtData(){
        return JSON.parse(this.fields.ext_data)
    }
    getStatus(){
        return this.fields.status
    }

    getInsertStmt(){
        return `INSERT INTO stats(area_id, device_id, type, value, status)
                VALUES (:area_id, :device_id, :type, :value, 'ACTIVE')`
    }
}

var stats = new StatsModel()
module.exports = stats

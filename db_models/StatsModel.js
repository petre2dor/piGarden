'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class StatsModel extends PrimaryModel {
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
        return `INSERT INTO stats(type, value, status)
                VALUES (:type, :value, 'ACTIVE')`
    }
}

module.exports = StatsModel

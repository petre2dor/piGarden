'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class DeviceModel extends PrimaryModel {
    //setters
    setId(val){
        this.fields.id = val
    }
    setName(val){
        this.fields.name = val
    }
    setType(val){
        this.fields.type = val
    }
    setDescription(val){
        this.fields.description = val
    }
    setStatus(val){
        this.fields.status = val
    }
    setOptions(val){
        this.fields.options = JSON.stringify(val)
    }

    //getters
    getId(){
        return this.fields.id
    }
    getName(){
        return this.fields.name
    }
    getType(){
        return this.fields.type
    }
    getDescription(){
        return this.fields.description
    }
    getStatus(){
        return this.fields.status
    }
    getOptions(){
        return JSON.parse(this.fields.options)
    }

    getReadStmt(){
        return `SELECT id, name, type, description, status, options
                FROM devices
                WHERE id = :id`
    }

    getInsertStmt(){
        return `INSERT INTO devices (id, name, type, description, status, options)
                VALUES(id = :id, name = :name, type = :type,
                    description = :description, status = :status, options = :options)`
    }

    getUpdateStmt(){
        return `UPDATE actions
                SET name = :name, type = :type, description = :description,
                    status = :status, options = :options
                WHERE id = :id`
    }
}

module.exports = DeviceModel

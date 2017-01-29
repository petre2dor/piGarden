'use strict'
var PrimaryModel = require('db_models/PrimaryModel.js')

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
        return `INSERT INTO devices (name, type, description, status, options)
                VALUES(:name, :type, :description, :status, :options)`
    }

    getUpdateStmt(){
        return `UPDATE devices
                SET name = :name, type = :type, description = :description,
                    status = :status, options = :options
                WHERE id = :id`
    }

    get(params){
        let where = ''
        if(params.type){
            where += ' AND type = :type'
            this.setDeviceId(params.device_id)
        }

        if(params.status){
            where += ' AND status = :status'
            this.setStatus(params.status)
        }
        let sql = `SELECT id, name, type, description, status, options
                    FROM devices
                    WHERE 1=1`+where+`;`
        return this.fetchAll(sql)
    }
}

module.exports = DeviceModel

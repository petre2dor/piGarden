'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class AreaDeviceModel extends PrimaryModel {
    //setters
    setAreaId(val){
        this.fields.area_id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setStatus(val){
        this.fields.status = val
    }
    setOptions(val){
        this.fields.options = JSON.stringify(val)
    }

    //getters
    getAreaId(){
        return this.fields.area_id
    }
    getDeviceId(){
        return this.fields.device_id
    }
    getStatus(){
        return this.fields.status
    }
    getOptions(){
        return JSON.parse(this.fields.options)
    }

    getInsertStmt(){
        return `INSERT INTO devices (area_id, device_id, status, options)
                VALUES(:area_id, :device_id, :status, :options)`
    }

    readAllByAreaId(){
        let sql = `SELECT area_id, device_id, status, options
                        FROM areas_devices
                        WHERE area_id = :area_id AND status = 'ACTIVE'`
        return this.fetchAll(sql)
    }

    readAllByDeviceId(){
        let sql = `SELECT area_id, device_id, status, options
                        FROM areas_devices
                        WHERE device_id = :device_id`
        return this.fetchAll(sql)
    }
}

module.exports = AreaDeviceModel

'use strict'
var PrimaryModel = require('db_models/PrimaryModel.js')

class StatsModel extends PrimaryModel {
    setAreaId(val){
        this.fields.area_id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setDate(val){
        this.fields.date = val
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
    getDate(){
        return this.fields.date
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

    getLatestRead(){
        let sql = `SELECT date, value, area_id, device_id, type, ext_data
                    FROM stats
                    WHERE status = 'ACTIVE'
                        AND device_id = :device_id
                        AND area_id = :area_id
                        AND type = :type
                    ORDER BY date DESC
                    LIMIT 1;`
        let params = {
                        device_id:  this.getDeviceId(),
                        area_id:    this.getAreaId(),
                        type:       this.getType()
                     }
        return this.fetch(sql, params)
    }

    get(since, until, groupByInterval){
        let sql = `SELECT MIN(date) AS date, AVG(value) AS value, area_id, device_id, type, ext_data
                    FROM stats
                    WHERE status = 'ACTIVE'
                        AND device_id = :device_id
                        AND area_id = :area_id
                        AND type = :type
                        AND date BETWEEN :since AND :until
                    GROUP BY UNIX_TIMESTAMP(date) DIV :divider
                    ORDER BY date DESC;`
        let params = {
                        device_id:  this.getDeviceId(),
                        area_id:    this.getAreaId(),
                        type:       this.getType(),
                        until:      until,
                        since:      since,
                        divider:    groupByInterval
                     }
        return this.fetchAll(sql, params)
    }
}

var stats = new StatsModel()
module.exports = stats

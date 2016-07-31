'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class ActionModel extends PrimaryModel {
    //setters
    setId(val){
        this.fields.id = val
    }
    setAreaId(val){
        this.fields.area_id = val
    }
    setVerb(val){
        this.fields.verb = val
    }
    setObject(val){
        this.fields.object = val
    }
    setOptions(val){
        this.fields.options = JSON.stringify(val)
    }
    setLastRunTime(val){
        this.fields.last_run_time = val
    }
    setNextRunTime(val){
        this.fields.next_run_time = val
    }
    setSchedule(val){
        this.fields.schedule = JSON.stringify(val)
    }
    setDescription(val){
        this.fields.description = val
    }
    setIsRunnning(val){
        this.fields.is_running = val
    }
    setStatus(val){
        this.fields.status = val
    }

    //getters
    getId(){
        return this.fields.id
    }
    getAreaId(){
        return this.fields.area_id
    }
    getVerb(){
        return this.fields.verb
    }
    getObject(){
        return this.fields.object
    }
    getOptions(){
        return JSON.parse(this.fields.options)
    }
    getLastRunTime(){
        return this.fields.last_run_time
    }
    getNextRunTime(){
        return this.fields.next_run_time
    }
    getSchedule(){
        return JSON.parse(this.fields.schedule)
    }
    getDescription(){
        return this.fields.description
    }
    getIsRunnning(){
        return this.fields.is_running
    }
    getStatus(){
        return this.fields.status
    }

    getInsertStmt(){
        return 'INSERT INTO actions SET ?'
    }

    getUpdateStmt(){
        return `UPDATE actions
                SET area_id = :area_id, verb = :verb, object = :object,
                    options = :options, last_run_time = :last_run_time,
                    next_run_time = :next_run_time, schedule = :schedule,
                    description = :description, is_running = :is_running,
                    status = :status
                WHERE id = :id`
    }

    readNextAction(){
        var sql = `SELECT id, area_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status
                    FROM actions
                    WHERE next_run_time <= NOW()
                    ORDER BY next_run_time ASC
                    LIMIT 1`;
        // console.log(sql);

        return new Promise((resolve, reject) => {
            this.query(sql)
                .then((result) => {
                    this
                    this.rawData = result
                    this.fields = result[0]
                    resolve(true)})})
    }
}

module.exports = ActionModel

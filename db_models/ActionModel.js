'use strict'
var PrimaryModel = require('db_models/PrimaryModel.js')

class ActionModel extends PrimaryModel {
    //setters
    setId(val){
        this.fields.id = val
    }
    setDeviceId(val){
        this.fields.device_id = val
    }
    setVerb(val){
        this.fields.verb = val
    }
    setObject(val){
        this.fields.object = val
    }
    setOptions(val){
        // todo create validateException and throw it here incase of parse error
        try {
            val = JSON.parse(val)
        } catch (e) {
            val = {}
        }
        this.fields.options = JSON.stringify(val)
    }
    setLastRunTime(val){
        this.fields.last_run_time = val
    }
    setNextRunTime(val){
        if(!val){
            let LocalDateTime = require('js-joda').LocalDateTime
            val = LocalDateTime.now().toString()
        }
        this.fields.next_run_time = val
    }
    setSchedule(val){
        // todo create validateException and throw it here incase of parse error
        try {
            val = JSON.parse(val)
        } catch (e) {
            val = {}
        }
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
    setRetries(val){
        this.fields.retries = val
    }

    //getters
    getId(){
        return this.fields.id
    }
    getDeviceId(){
        return this.fields.device_id
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
    getRetries(){
        return this.fields.retries
    }

    getReadStmt(){
        return `SELECT id, device_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status, retries
                FROM actions
                WHERE id = :id`
    }

    getInsertStmt(){
        return `INSERT INTO actions (device_id, verb, object, options,
                    next_run_time, schedule, description, status)
                VALUES(:device_id, :verb, :object, :options,
                    :next_run_time, :schedule, :description, :status)`
    }

    getUpdateStmt(){
        return `UPDATE actions
                SET device_id = :device_id, verb = :verb,
                    object = :object, options = :options,
                    last_run_time = :last_run_time, next_run_time = :next_run_time,
                    schedule = :schedule, description = :description,
                    is_running = :is_running, status = :status, retries = :retries
                WHERE id = :id`
    }

    readNextAction(){
        let sql = `SELECT id, device_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status, retries
                    FROM actions
                    WHERE (next_run_time <= NOW() AND status IN ('ACTIVE', 'WARNING'))
                        OR (status NOT IN ('ACTIVE', 'WARNING', 'ERROR', 'INACTIVE') AND next_run_time < NOW() - INTERVAL 5 minute)
                    ORDER BY next_run_time ASC
                    LIMIT 1`;
        return this.fetch(sql)
    }


    getReadByDeviceObjectVerb(){
        let sql = `SELECT id, device_id, verb, object, options, last_run_time,
                        next_run_time, schedule, description, is_running, status, retries
                    FROM actions
                    WHERE device_id = :device_id AND object = :object AND verb = :verb;`
        return this.fetch(sql)
    }
}

module.exports = ActionModel

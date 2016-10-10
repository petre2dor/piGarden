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
    setRetries(val){
        this.fields.retries = val
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
    getRetries(){
        return this.fields.retries
    }

    getReadStmt(){
        return `SELECT id, area_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status, retries
                FROM actions
                WHERE id = :id`
    }

    getInsertStmt(){
        return `INSERT INTO actions (area_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status)
                VALUES(area_id = :area_id, verb = :verb, object = :object,
                    options = :options, last_run_time = :last_run_time,
                    next_run_time = :next_run_time, schedule = :schedule,
                    description = :description, is_running = :is_running,
                    status = :status)`
    }

    getUpdateStmt(){
        return `UPDATE actions
                SET area_id = :area_id, verb = :verb,
                    object = :object, options = :options,
                    last_run_time = :last_run_time, next_run_time = :next_run_time,
                    schedule = :schedule, description = :description,
                    is_running = :is_running, status = :status, retries = :retries
                WHERE id = :id`
    }

    readNextAction(){
        var sql = `SELECT id, area_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status, retries
                    FROM actions
                    WHERE (next_run_time <= NOW() AND status IN ('ACTIVE', 'WARNING'))
                        OR (status NOT IN ('ACTIVE', 'WARNING', 'ERROR', 'INACTIVE') AND next_run_time < NOW() - INTERVAL 5 minute)
                    ORDER BY next_run_time ASC
                    LIMIT 1`;

        return new Promise((resolve, reject) => {
            this.query(sql)
                .then((result) => {
                    if(result.length > 0){
                        this.fields = result[0]
                        resolve(this)
                    }else{
                        reject({
                            httpCode: 200,
                            type: 'WARNING',
                            message: 'There is no next action available',
                            data: []
                        })
                    }
                })})
    }


    getReadByAreaObjectVerb(){
        var sql = `SELECT id, area_id, verb, object, options, last_run_time,
                        next_run_time, schedule, description, is_running, status, retries
                    FROM actions
                    WHERE area_id = :area_id AND object = :object AND verb = :verb;`
        return new Promise((resolve, reject) => {
            this.query(sql)
                .then((result) => {
                    if(result.length > 0){
                        this.fields = result[0]
                        resolve(this)
                    }else{
                        reject('There is no action available')
                    }
                })})
    }
}

module.exports = ActionModel

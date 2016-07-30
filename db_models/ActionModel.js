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
    getId(val){
        return this.fields.id
    }
    getAreaId(val){
        return this.fields.area_id
    }
    getVerb(val){
        return this.fields.verb
    }
    getObject(val){
        return this.fields.object
    }
    getOptions(val){
        return JSON.parse(this.fields.options)
    }
    getLastRunTime(val){
        return this.fields.last_run_time
    }
    getNextRunTime(val){
        return this.fields.next_run_time
    }
    getSchedule(val){
        return JSON.parse(this.fields.schedule)
    }
    getDescription(val){
        return this.fields.description
    }
    getIsRunnning(val){
        return this.fields.is_running
    }
    getStatus(val){
        return this.fields.status
    }

    getInsertStmt(){
        return 'INSERT INTO logs SET ?'
    }

    readNextAction(callback){
        var sql = `SELECT id, area_id, verb, object, options, last_run_time,
                    next_run_time, schedule, description, is_running, status
                    FROM actions
                    WHERE next_run_time <= NOW()
                    ORDER BY next_run_time ASC
                    LIMIT 1`;
         callback(sql);
    }
}

module.exports = ActionModel

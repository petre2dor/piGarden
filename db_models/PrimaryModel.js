'use strict'
var Utilities = require('../util/utilities.js')

class PrimaryModel {
    constructor(conn){
        this.connection = conn
        this.fields = {}
    }

    getReadStmt(){
        throw 'No Read Statement defined'
    }

    getInsertStmt(){
        throw 'No Insert Statement defined'
    }

    getUpdateStmt(){
        throw 'No Read Statement defined'
    }

    read (){
        this.query(this.getReadStmt())
    }

    insert (){
        this.query(this.getInsertStmt())
    }

    create(fields){
        var currentSetter;
        for (var field in fields) {
            currentSetter = this.getSetterFunction(field)
            if(currentSetter in this) {
                this[currentSetter](fields[field])
            } else {
                throw 'Undefined setter: "' + currentSetter + '". You are trying to save a field that doesn\'t have a setter. Make sure the field "'+field+'" exist and create a setter in the model classs.'
            }
        }
        this.insert()
        this.reset()
    }

    update (){
        this.query(this.getUpdateStmt())
    }


    query (statement, callback = false){
        var query = this.connection.query(statement, this.fields, function(err, result) {
            if (err) throw err
            if (callback) callback(result)
        })
        // console.log(query.sql)
    }

    getSetterFunction(field){
        var functionName = 'set';
        var arr = field.split('_');

        for (var i = 0; i < arr.length; i++) {
            functionName += Utilities.capitalize(arr[i]);
        }
        return functionName
    }

    reset(){
        this.fields = {}
    }
}

module.exports = PrimaryModel

'use strict'
var Utilities   = require('../util/utilities.js')
var Connection  = require('../util/connection.js')

class PrimaryModel {
    constructor(){
        this.fields     = {}
        this.rowData    = []
        this.rowIndex   = 0
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

    read(){
        return new Promise((resolve, reject) => {
            this.query(this.getReadStmt())
                .then((result) => {
                    if(result.length > 0){
                        this.fields = result[0]
                        resolve(this)
                    }else{
                        reject('There is no result available')
                    }
                })})
    }

    insert(){
        return this.query(this.getInsertStmt())
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

    update(){
        return this.query(this.getUpdateStmt())
    }

    query (statement){
        var fields = this.fields
        return new Promise((resolve, reject) => {
            Connection.acquire(function(err, conn) {
                if(err) throw err
                var query = conn.query(statement, fields, (err, result) => {
                        conn.release()
                        // if (err) throw err
                        if (!err) {
                            resolve(result)
                        } else {
                            reject({
                                httpCode: 403,
                                type: 'ERROR',
                                message: 'Could not run query. Message: ' + JSON.stringify(err),
                                data: err
                            })
                        }
                    }
                )
            })
        })
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

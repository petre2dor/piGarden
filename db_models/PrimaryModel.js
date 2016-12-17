'use strict'
var Utilities   = require('util/utilities.js')
var Connection  = require('util/connection.js')

class PrimaryModel {
    constructor(){
        this.reset()
    }

    reset(){
        this.fields     = {}
        this.rowData    = []
        this.results    = []
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

    getFields(){
        console.log(Utilities.isEmpty(this.fields));
        return !Utilities.isEmpty(this.fields) ? this.fields : null
    }

    read(){
        return this.fetch(this.getReadStmt())
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

    query (statement, params = false){
        let paramss = params || this.fields;
        return new Promise((resolve, reject) => {
            Connection.acquire(function(err, conn) {
                if(err) throw err
                var query = conn.query(statement, paramss, (err, result) => {
                        conn.release()
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

    fetch(statement, params = false){
        if (!params){
            params = this.fields
        }

        return this
                .query(statement, params)
                .then(result => {
                    this.fields = {}
                    if(result.length > 0){
                        this.fields = result[0]
                    }
                    return this
                })
    }

    fetchAll(statement, params = false, msgOnNoResults = {}){
        if (!params){
            params = this.fields
        }
        return this
                .query(statement, params)
                .then(results => {
                    this.results = []
                    this.fields = {}
                    this.rowIndex = 0
                    if(results.length > 0){
                        this.results = results
                        this.fields = results[0]
                    }
                    return this
                })
            })
    }

    getNextResult(){
        this.rowIndex++
        if(this.results[this.rowIndex]){
            this.fields = this.results[this.rowIndex]
            return this
        }
        this.reset()
        return this
    }

    getSetterFunction(field){
        var functionName = 'set';
        var arr = field.split('_');

        for (var i = 0; i < arr.length; i++) {
            functionName += Utilities.capitalize(arr[i]);
        }
        return functionName
    }
}

module.exports = PrimaryModel

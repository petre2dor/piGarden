'use strict'

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

    update (){
        this.query(this.getUpdateStmt())
    }

    query (statement, callback = false){
        var query = this.connection.query(statement, this.fields, function(err, result) {
            if (err) throw err
            if (callback) callback(result)
        })
        this.connection.end()
    }
}

module.exports = PrimaryModel

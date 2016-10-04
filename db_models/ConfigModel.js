'use strict'
var PrimaryModel = require('./PrimaryModel.js')

class ConfigModel extends PrimaryModel {
    setName(val){
        this.fields.name = val
    }
    setValue(val){
        this.fields.value = val
    }
    setOptions(val){
        this.fields.options = JSON.stringify(val)
    }
    setDescription(val){
        this.fields.description = val
    }

    getName(){
        return this.fields.name
    }
    getValue(){
        return this.fields.value
    }
    getOptions(){
        return JSON.parse(this.fields.options)
    }
    getDescription(){
        return this.fields.description
    }

    getInsertStmt(){
        return `INSERT INTO configs(name, value, description, description)
                VALUES (:name, :value, :description, :description)`
    }

    readByName(){
        var sql = `SELECT name, value, description, description
                    FROM configs WHERE name = :name`
        return new Promise((resolve, reject) => {
            this.query(sql)
                .then((result) => {
                    if(result.length > 0){
                        this.fields = result[0]
                        resolve(this)
                    }else{
                        reject('There is no config with name: '+this.getName())
                    }
                })})
    }
}
var config = new ConfigModel()
module.exports = config

// The Root provides a resolver function for each API endpoint


const LogModel        = require('db_models/LogModel')
const StatsModel      = require('db_models/StatsModel')


let getAction = function(id){
    console.log(id)
    return {id: id, device_id: 43, options: 'thug4life'}
}


let Root = {
    action: params => getAction(params.id)
}
module.exports = Root

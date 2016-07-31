'use strict'
// const MODEL_PATH = 'db_models/'
var Request         = require('../util/request.js')
var LogModel        = require('../db_models/LogModel.js')
var ActionHandler   = require('./ActionHandler.js')
var mysql           = require('mysql')
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'db_gardener',
  password : 'KTgdXz3SSMCY',
  database : 'pi_garden'
})
conn.connect()
// conn.config.queryFormat = function (query, values) {
//   if (!values) return query;
//   return query.replace(/\:(\w+)/g, function (txt, key) {
//     if (values.hasOwnProperty(key)) {
//       return this.escape(values[key]);
//     }
//     return txt;
//   }.bind(this));
// }


try {
    var logModel = new LogModel(conn)
    logModel.create({type: 'ACTION_HANDLER_START', description: 'Start ActionHandler'})

    var actionHandler = new ActionHandler(conn, logModel);
    actionHandler.run();

    var logModel = new LogModel(conn)
    logModel.create({type: 'ACTION_HANDLER_END', description: 'End ActionHandler'})
} catch (e) {
    logModel.create({area_id: 1, device_id: 1, type: 'ACTION_RUNNER_ERR', description: e})
} finally {

}


// conn.end()

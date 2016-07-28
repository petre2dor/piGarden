'use strict'
// const MODEL_PATH = 'db_models/'
var Request     = require('./util/request.js')
var LogModel    = require('./db_models/LogModel.js')
var mysql       = require('mysql')
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'db_gardener',
  password : 'KTgdXz3SSMCY',
  database : 'pi_garden'
})
conn.connect()


var logModel = new LogModel(conn)
logModel.setAreaId(1)
logModel.setDeviceId(1)
logModel.setType('ACTION_RUNNER')
logModel.setDescription('Starting ActionRunner')
logModel.insert()

var actionHandler = new ActionHandler();
actionHandler.run();


conn.end()

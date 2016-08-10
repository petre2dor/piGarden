var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')

var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/read/temperature/:areaId',function(req,res) {
            log.create({area_id: req.params.areaId, device_id: 0, type: 'READ_TEMPERATURE', description: 'Testing an AC endpoint'})

            res.send({bun: 'așa'});
        })
    }
}

var Connection  = require('../util/connection');
var LogModel    = require('../db_models/LogModel.js')

var log = new LogModel()

module.exports = {
    configure: function(app) {
        app.get('/:areaId/:deviceId',function(req,res) {
            log.create({area_id: req.params.areaId, device_id: req.params.deviceId, type: 'DEVICES_GET', description: 'Testing a device endpoint'})

            res.send({bun: 'așa'});
        })
    }
}

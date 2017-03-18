'use strict'

const Influx = require('influx')

module.exports = new Influx.InfluxDB({
                        host: '127.0.0.1',
                        database: 'piGarden'
                    })

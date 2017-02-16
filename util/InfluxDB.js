'use strict'

const Influx = require('influx')

module.exports = new Influx.InfluxDB({
                        host: 'localhost',
                        database: 'piGarden'
                    })

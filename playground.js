// in this file I play with code snippets and ideas

// 'use strict'
// var Duration        = require('js-joda').Duration
// var LocalDateTime   = require('js-joda').LocalDateTime

// obtain a Duration of 10 hours
// console.log(Duration.parse("PT10H")) // "PT10H"


// var dt = LocalDateTime.parse('2012-12-24T12:00')

// console.log(LocalDateTime.now().plus(Duration.parse('PT' + '30S').toString())


var PythonShell = require('python-shell')

PythonShell.run('devices/scripts/valve/open.py', function (err, results) {
    if (err) throw err
    if(results.indexOf('true') === 0) {
        console.log('true results ', results)
    } else {
        console.log('not true results ', results)
    }
})

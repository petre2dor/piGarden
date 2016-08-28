// in this file I play with code snippets and ideas

'use strict'
var Duration        = require('js-joda').Duration
var LocalDateTime   = require('js-joda').LocalDateTime

// obtain a Duration of 10 hours
// console.log(Duration.parse("PT10H")) // "PT10H"


var dt = LocalDateTime.parse('2012-12-24T12:00')

console.log(dt.dayOfWeek().toString())

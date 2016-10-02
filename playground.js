// in this file I play with code snippets and ideas

// 'use strict'
// var Duration        = require('js-joda').Duration
// var LocalDateTime   = require('js-joda').LocalDateTime

// obtain a Duration of 10 hours
// console.log(Duration.parse("PT10H")) // "PT10H"


// var dt = LocalDateTime.parse('2012-12-24T12:00')

// console.log(LocalDateTime.now().plus(Duration.parse('PT' + '30S').toString())



testPromise0 = function(){
    return new Promise((resolve, reject) => {
        resolve('p0', 'p1')
    })
}

testPromise1 = function(){
    return new Promise((resolve, reject) => {
        resolve('resolve1')
    })
}


testPromise0()
    .then((p0, p1) => {
        console.log('response ' + p0 + ' ' + p1);
        return testPromise1()
    })
    .then((response1) => {
        console.log('response1 ' + response1);
    })
    .catch((reason) => {
        console.log('reason ', reason);
    })

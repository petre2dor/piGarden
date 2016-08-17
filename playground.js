// in this file I play with code snippets and ideas

'use strict'

var promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve('time ran out!')
    }, 700)
})

promise
    .then( (value) => {
        console.log('then 1', value)
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                reject('rejected!')
            }, 700)
        })
    })
    .catch((reason) => { console.log('catch 1', reason) })
    .then((value) => {console.log('then 2', value)})
    .catch((reason) => { console.log('catch 2', reason) })
    .then((value) => {console.log('then 3', value)})

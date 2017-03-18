describe("request.js", function() {
    var Request = require('../request')
    var request
    var http = require('http')
    var temperaturePromise
	var promiseHelper

    beforeEach(function() {
        request = new Request('127.0.0.1', 3000)

        getPromise = new Promise(function(resolve, reject) {
			promiseHelper = {
				resolve: resolve
			}
		})
        spyOn(request, 'getHttpRequest').and.returnValue(getPromise)
        temperaturePromise = request.get('/')
    })

    it('returns a promise', function() {
		expect(temperaturePromise).toEqual(jasmine.any(Promise))
	})

    describe('on successful get', function() {
		beforeEach(function() {
            var response = new Promise( (resolve, reject) => {
                resolve({temperature: 78})
            })
            promiseHelper.resolve(response)
		})

		it('resolves its promise with the current temperature', function(done) {
			// We need our returned promise to have passed along the temperature
            temperaturePromise.then(function(response) {
    			expect(response.temperature).toEqual(78);
    			done()
    		})
		})
	})
    // todo -> finish testing for post and failed requests
})

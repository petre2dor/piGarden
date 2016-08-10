describe("utilities.js", function() {
    var Utilities = require('../utilities')

    it('capitalize() should return capitalized string', function(){
        expect(Utilities.capitalize('mamapasta')).toEqual('Mamapasta')
    })
})

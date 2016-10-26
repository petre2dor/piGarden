describe("AH", function () {
    var AH = require('../ActionHandler')

    it(`expects getNextStatus() to return WARNING in case of ERROR
        and retries are still available`,
        () => {
            const schedule = {type: 'cyclic'}
            status = AH.getNextStatus(schedule, httpCode = 400, retries = 0, max_retries = 10)
            expect(status).toBe('WARNING')
        })
    it(`expects getNextStatus() to return ERROR in case of ERROR
        and retries are maxed out`,
        () => {
            const schedule = {type: 'cyclic'}
            status = AH.getNextStatus(schedule, httpCode = 400, retries = 10, max_retries = 10)
            expect(status).toBe('ERROR')
        })
    it(`expects getNextStatus() to return ACTIVE for successful, cyclic actions`,
        () => {
            const schedule = {type: 'cyclic'}
            status = AH.getNextStatus(schedule, httpCode = 200, retries = 0, max_retries = 10)
            expect(status).toBe('ACTIVE')
        })
    it(`expects getNextStatus() to return COMPLETED for successful, fixed actions`,
        () => {
            const schedule = {type: 'fixed'}
            status = AH.getNextStatus(schedule, httpCode = 200, retries = 0, max_retries = 10)
            expect(status).toBe('COMPLETED')
        })
    it(`expects getNextStatus() to return WARNING for successful actions
            with unknown schedule.type`,
        () => {
            const schedule = {type: 'something_else'}
            status = AH.getNextStatus(schedule, httpCode = 200, retries = 0, max_retries = 10)
            expect(status).toBe('WARNING')
        })

    it("expects getRetriesNo() to incremement retriesNo if nextStatus is WARNING",
        () => {
            var retries = AH.getRetriesNo(oldRetriesNo = 1, nextStatus = 'WARNING')
            expect(retries).toBe(2)
        })
    it(`expects getRetriesNo() to incremement retriesNo
                    if nextStatus is not in [WARNING, ERROR, ACTIVE, INACTIVE]`,
        () => {
            var retries = AH.getRetriesNo(oldRetriesNo = 3, nextStatus = 'RANDOM')
            expect(retries).toBe(4)
        })
    it(`expects getRetriesNo() to reset retriesNo
                                if nextStatus is in [ERROR, ACTIVE, INACTIVE]`,
        () => {
            var retries = AH.getRetriesNo(oldRetriesNo = 3, nextStatus = 'ACTIVE')
            expect(retries).toBe(0)

            var retries = AH.getRetriesNo(oldRetriesNo = 13, nextStatus = 'INACTIVE')
            expect(retries).toBe(0)

            var retries = AH.getRetriesNo(oldRetriesNo = 213, nextStatus = 'ERROR')
            expect(retries).toBe(0)
        })
})

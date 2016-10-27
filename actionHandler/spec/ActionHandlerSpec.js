describe("AH", function () {
    const AH            = require('../ActionHandler')
    const ActionModel   = require('../../db_models/ActionModel')
    const LogModel      = require('../../db_models/LogModel')
    const Duration      = require('js-joda').Duration
    const LocalDateTime = require('js-joda').LocalDateTime
    const ChronoUnit    = require('js-joda').ChronoUnit

    // reschedule
    it(`expects reschedule() to update action`,
        () => {
            spyOn(AH, 'getNextRunTime').and.returnValue('2016-10-19 21:30:27')
            spyOn(AH, 'getNextStatus').and.returnValue('ACTIVE')
            spyOn(AH, 'getRetriesNo').and.returnValue(0)

            var actionModel = new ActionModel()
            spyOn(actionModel, 'getSchedule').and.returnValue({})
            spyOn(actionModel, 'getRetries').and.returnValue(0)
            spyOn(actionModel, 'setNextRunTime')
            spyOn(actionModel, 'setRetries')
            spyOn(actionModel, 'setStatus')
            spyOn(actionModel, 'update')

            spyOn(LogModel, 'create').and.returnValue(true)

            AH.reschedule(actionModel, httpCode = 200)
            expect(actionModel.setNextRunTime).toHaveBeenCalledWith('2016-10-19 21:30:27')
            expect(actionModel.setRetries).toHaveBeenCalledWith(0)
            expect(actionModel.setStatus).toHaveBeenCalledWith('ACTIVE')
            expect(actionModel.update).toHaveBeenCalled()
        })

    // getNextRunTime
    it(`expects getNextRunTime() to return after 2sec in case of ERROR`,
        () => {
            var nextRunTime = AH.getNextRunTime({}, 400)
            nextRunTime = LocalDateTime.parse(nextRunTime)
            const expectedNextRunTime = LocalDateTime.now().plus(Duration.parse('PT2S'))
            const timeDiff = nextRunTime.until(expectedNextRunTime, ChronoUnit.SECONDS)

            expect(timeDiff <= 1).toBeTruthy();
        })
    it(`expects getNextRunTime() to return after schedule.type for cyclic actions`,
        () => {
            const afterSec = 'PT10S';
            const schedule = {type: 'cyclic', every: afterSec}
            var nextRunTime = AH.getNextRunTime(schedule, 200)
            nextRunTime = LocalDateTime.parse(nextRunTime)

            const expectedNextRunTime = LocalDateTime.now().plus(Duration.parse(afterSec))
            const timeDiff = nextRunTime.until(expectedNextRunTime, ChronoUnit.SECONDS)

            expect(timeDiff <= 1).toBeTruthy();
        })
    it(`expects getNextRunTime() to return now for fixed actions`,
        () => {
            const afterSec = 'PT10S';
            const schedule = {type: 'fixed'}
            var nextRunTime = AH.getNextRunTime(schedule, 200)
            nextRunTime = LocalDateTime.parse(nextRunTime)

            const expectedNextRunTime = LocalDateTime.now()
            const timeDiff = nextRunTime.until(expectedNextRunTime, ChronoUnit.SECONDS)

            expect(timeDiff <= 1).toBeTruthy();
        })


    // getNextStatus()
    it(`expects getNextStatus() to return WARNING in case of ERROR
        and retries are still available`,
        () => {
            const schedule = {type: 'cyclic'}
            const status = AH.getNextStatus(schedule, httpCode = 400, retries = 0, max_retries = 10)
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


    // getRetriesNo()
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

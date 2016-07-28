
class ActionHandler {
    constructor() {
        var actionModel = new ActionModel(conn)
        var nextAction = false;
    }

    run() {
        stop = false
        while (!stop) {
            nextAction = actionModel.readNextAction()
            if (!nextAction) {
                // call run after 10 sec
                stop = true
            } else {
                runAction(nextAction)
            }
        }
    }

    runAction(action){
        //call to controller
        //analyze controller response
        //reschedule this action
    }

    reschedule(action, controller_response){

    }
}

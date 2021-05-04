/* Error, which text need to be showed to user!*/

class AlertError extends Error{
    constructor(message){
        super();
        this.name = "AlertError";
        this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlertError);
          } else {
            this.stack = (new Error()).stack;
        }
    }
}


module.exports = AlertError;
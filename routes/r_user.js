const User = require('../rules/user.js');
const {wrap_class} = require('../lib/wrapper');

class R_User {
    static async signup(req, res) { 
        const {signup_type, ...params} = req.body;
        switch(signup_type){
            case "student":
                await User.signup_student(params);
                break;
            case "employer":
                await User.signup_employer(params);
                break;
            default: throw new Error("Wrong signup type!");
        }
        res.end();
    }
}

wrap_class(R_User);
module.exports = R_User;

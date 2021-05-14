const User = require('../rules/user.js');
const {wrap_class} = require('../lib/wrapper');
const Security = require("../lib/security");

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

    static async signin(req, res){
        const data = User.signin(req.body);
        const token = Security.generate_token(data);
        res.cookie("token", token, {expires: new Date(Date.now() + 84600 * 1000 )}); 
        res.send(data); 
    }

    static async edit_profile(req, res){
        console.log(req.body);   
        const {email}  =  Security.jwtTokenCheck(req.cookies.token);
        req.body["email"] = email;
        const data = await User.edit_profile(req.body);
        res.send();
    }
}

wrap_class(R_User);
module.exports = R_User;

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
        const data = await User.signin(req.body);
        const token = Security.generate_token(data);
        res.cookie("token", token, {expires: new Date(Date.now() + 84600 * 1000 )});
        res.send(data); 
    }

    static async edit_profile(req, res){
        const data = Security.jwtTokenCheck(req.cookies.token);
        req.body["_id"] = data._id;
        await User.edit_profile(req.body);
        res.end();
    }

    static async get_all_students(req, res){   
        const data = await User.get_all_students();
        res.send(data);
    }

    static async get_all_employers(req, res){   
        const data = await User.get_all_employers();
        res.send(data);
    }

    static async accept_student(req, res){
        const data = User.accept_student(req.body);    
        res.send(data); 
    }

    static async ban_student(req, res){
        const data = User.ban_student(req.body);    
        res.send(data); 
    }

    static async get_statistics(req, res){   
        const data = await User.get_statistics();
        res.send(data);
    }

    static async get_student(req, res) {
        const {_id} = Security.jwtTokenCheck(req.cookies.token);
        req.body["_id"] = _id;
        const data = await User.get_student(req.body); 
        res.send(data);
    }

}

wrap_class(R_User);
module.exports = R_User;

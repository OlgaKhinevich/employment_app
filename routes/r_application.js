const Application = require('../rules/application.js');
const {wrap_class} = require('../lib/wrapper');

class R_Application {
    static async add_application(req, res) {
        const data = await Application.add_application(req.body);
        res.send(data); 
    }

    static async get_applications(req, res) {
        const data = await Application.get_applications(req.body);
        res.send(data); 
    }

    static async accept_application(req, res) {
        const data = await Application.accept_application(req.body);
        res.send(data); 
    }

    static async reject_application(req, res) {
        const data = await Application.reject_application(req.body);
        res.send(data); 
    }
}

wrap_class(R_Application);
module.exports = R_Application;

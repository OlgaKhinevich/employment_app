const Vacancy = require('../rules/vacancy.js');
const {wrap_class} = require('../lib/wrapper');
const Security = require("../lib/security");

class R_Vacancy {
    static async search_vacancy(req, res) {
        const data = await Vacancy.search_vacancy(req.body);
        res.send(data); 
    }

    static async add_vacancy(req, res) {
        const {_id} = Security.jwtTokenCheck(req.cookies.token);
        req.body["_id"] = _id;
        Vacancy.add_vacancy(req.body); 
    }

    static async get_company_vacancies(req, res) {
        const {_id} = Security.jwtTokenCheck(req.cookies.token);
        req.body["_id"] = _id;
        const data = await Vacancy.get_company_vacancies(req.body);
        res.send(data);
    }

    static async delete_vacancy(req, res) {
        const data = await Vacancy.delete_vacancy(req.body);
        console.log(data);
        res.send(data);
    }

    static async get_all_vacancies(req, res) {
        const data = await Vacancy.get_all_vacancies(req.body);
        console.log(data);
        res.send(data);
    }

    static async get_company(req, res) {
        const data = await Vacancy.get_company(req.body);
        console.log(data);
        res.send(data);
    }
}

wrap_class(R_Vacancy);
module.exports = R_Vacancy;

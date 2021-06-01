const M_Application = require("../models/application");
const AlertError = require("../lib/alert_error");
const nodemailer = require("nodemailer");

class Application {
    static async add_application(data={}){
        const {position, company_name, status, cover_letter} = data;
        console.log(data);
        if(!position || !company_name || !status) throw new AlertError("Wrong params!");
        const result = await (new M_Application ({ 
            position, company_name, status, cover_letter
        })).save();
        return result;  
    }

    static async get_applications() {
        return await M_Application.find({});
    }

    static async accept_application(data={}) {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, 
            auth: {
              user: "olya-khinevich@yandex.ru", 
              pass: "xnat2699ol", 
            },
        });
        const {status, _id, employer_answer} = data;
        console.log(data);
        const application = await M_Application.findOne({_id});
        console.log(application);
        if(!application) throw new Error("Такой заявки не существует!");
        Object.assign(application, {status, employer_answer});
        await transporter.sendMail({
            from: "olya-khinevich@yandex.ru",
            to: "olya-khinevich@yandex.ru",
            subject: "Уведомление из приложения по трудоустройству выпускников",
            html: `Ваша заявка рассмотрена работодателем. `
        })   
    }

    static async reject_application(data={}) {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, 
            auth: {
              user: "olya-khinevich@yandex.ru", 
              pass: "xnat2699ol", 
            },
         });
   
        const {status, _id, employer_answer} = data;
        const application = await M_Application.findOne({_id});
        if(!application) throw new Error("Такой заявки не существует!");
        Object.assign(application, {status, employer_answer});
        await transporter.sendMail({
            from: "olya-khinevich@yandex.ru",
            to: "olya-khinevich@yandex.ru",
            subject: "Уведомление из приложения по трудоустройству выпускников",
            html: `Ваша заявка рассмотрена работодателем. `
         })   
    }
}
 
module.exports = Application;
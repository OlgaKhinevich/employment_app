const M_Vacancy = require("../models/vacancy");

class Vacancy {

    static async add_vacancy(data={}){
       const {surname, name, patronymic, email, password, faculty, profession, gradebook_number} = data;
       if(!surname || !name || !patronymic || !email || !password || !faculty || !profession || !gradebook_number) throw new Error("Wrong params!");
       if(!email.includes("@")) throw new Error ("Wrong email!");
       await (new M_Vacancy ({
          surname, 
          name, 
          patronymic, 
          email, password, 
          faculty, 
          profession, 
          gradebook_number
       })).save();   
    } 
 }
 
 module.exports = Vacancy;

const M_Vacancy = require("../models/vacancy");

class Vacancy {

    static async add_vacancy(data={}){
       const {} = data;
       if(!surname || !name || !patronymic || !email || !password || !faculty || !profession || !gradebook_number) throw new Error("Wrong params!");
       if(!email.includes("@")) throw new Error ("Wrong email!");
       await (new M_Vacancy ({
         
       })).save();   
    }

    static async search_vacancy(data={}){
      const {position, min_salary, max_salary, professional_field, employment_type, work_schedule, city} = data;
        
   }
    
    
 }
 
 module.exports = Vacancy;

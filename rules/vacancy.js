const M_Vacancy = require("../models/vacancy");

class Vacancy {

    static async add_vacancy(data={}){
      const {position, min_salary, max_salary, professional_field, employment_type, work_schedule,
         city, address, duties, professional_skills, personal_qualities, working_conditions,
         additionally, phone_number, email, _id} = data;
      if(!position || !professional_field || !employment_type ||
         !work_schedule || !duties || !professional_skills || 
         !personal_qualities || !working_conditions) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error ("Wrong email!");
       await (new M_Vacancy ({
         position, min_salary, max_salary, professional_field, employment_type, work_schedule,
         city, address, duties, professional_skills, personal_qualities, working_conditions,
         additionally, phone_number, email, company: _id
       })).save();   
    }

    static async search_vacancy(data={}){
      const {position, min_salary, max_salary, professional_field, employment_type, work_schedule, city} = data;
      console.log(data);
      const result = await M_Vacancy.find({
        position, min_salary, max_salary, professional_field, employment_type, work_schedule, city
      });  
      return result;
    }
    
    static async get_company_vacancies({_id}) { 
      const vacancies = await M_Vacancy.find({company: _id});
      console.log(vacancies); 
    }
 }
 
 module.exports = Vacancy;

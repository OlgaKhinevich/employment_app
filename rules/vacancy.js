const M_Vacancy = require("../models/vacancy");
const M_Employer = require("../models/employer");

class Vacancy {

    static async add_vacancy(data={}){
      const {position, min_salary, max_salary, professional_field, employment_type, work_schedule,
         city, address, duties, professional_skills, personal_qualities, working_conditions,
         additionally, phone_number, email, _id, status} = data;
      if(!position || !professional_field || !employment_type ||
         !work_schedule || !duties || !professional_skills || 
         !personal_qualities || !working_conditions) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error ("Wrong email!");
       await (new M_Vacancy ({
         position, min_salary, max_salary, professional_field, employment_type, work_schedule,
         city, address, duties, professional_skills, personal_qualities, working_conditions,
         additionally, phone_number, email, company: _id, status
       })).save();   
    }

    static async search_vacancy(data={}){
      const {position, min_salary, max_salary, professional_field, employment_type, work_schedule, city} = data;
      
      const result = await M_Vacancy.find({
        $or: [{position}, {min_salary}, {max_salary}, {professional_field}, {employment_type}, {work_schedule}, {city}]
      });  
      return result;
    }
    
    static async get_company_vacancies({_id}) { 
      return await M_Vacancy.find({company: _id});
    }

    static async delete_vacancy({_id}) {
      return await M_Vacancy.deleteOne({_id});
    }

    static async get_all_vacancies() {
      return await M_Vacancy.find({});
    }

    static async get_company({company}) {
      if (!company) throw new Error("Wrong params!");
      const employer = await M_Employer.find({_id: company});
      console.log(employer);
      return employer;
    }

 }
 
 module.exports = Vacancy;

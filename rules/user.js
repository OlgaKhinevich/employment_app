const M_Student = require("../models/student");
const M_Employer = require("../models/employer");
const AlertError = require("../lib/alert_error");

class User{

   static async signup_student(data={}){
      const {surname, name, patronymic, email, password, faculty, profession, gradebook_number} = data;
      if(!surname || !name || !patronymic || !email || !password || !faculty || !profession || !gradebook_number) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error ("Wrong email!");
      const user = await M_Student.find({email});
      if(user.length > 0) throw new AlertError("Такой пользователь уже существует!");
      await (new M_Student ({
         surname, 
         name, 
         patronymic, 
         email, password, 
         basic_edu: {higher_edu: {gradebook_number, faculty, profession}} 
      })).save();   
   } 

   static async signup_employer(data={}){
      const {surname, name, patronymic, email, password, company_name, company_direction, company_description, company_url} = data;
      if(!surname || !name || !patronymic || !email || !password || !company_name || !company_direction || 
         !company_description || !company_url) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error("Wrong email!");
      const user = await M_Employer.find({email});
      if(user.length > 0) throw new AlertError("Такой пользователь уже существует!");
      await (new M_Employer({
         surname, 
         name, 
         patronymic, 
         email, 
         password, 
         company_name,
         company_description,
         company_direction,
         company_url      
      })).save();  
   }

   static async signin(data={}){
      const {email, password, mode} = data;
      if (!email || !password) throw new Error("Wrong params!");
      let user;
      switch(mode){
         case "employer":
            user = await M_Employer.find({email});
            break;
         case "student":
            user = await M_Student.find({email});
            break;
         default: throw new Error("Wrong signin mode!");
      }
      if(!user) throw new AlertError("Пользователя не существует!");
      if(user[0].password !== password) throw new AlertError("Пароль неверный!");
      return  { email, mode };
   }

   static async edit_profile(data={}){    
      const {surname, name, patronymic, birth_date, email, password, telephone_number, basic_edu,
         additional_edu, work_experience, personal_qualities,
         additionally, portfolio, achievements} = data;
      const student = await M_Student.find();
      student.surname = surname;
      student.name = name;
      student.patronymic = patronymic;
      student.birth_date = birth_date;
      student.email = email;
      student.password = password;
      student.telephone_number = telephone_number;
      student.basic_edu = basic_edu;
      student.additional_edu = additional_edu;
      student.work_experience = work_experience;
      student.personal_qualities = personal_qualities;
      student.additionally = additionally;
      student.portfolio = portfolio;
      student.achievements = achievements;
      console.log(student);
      Object.assign(student, {surname, name, patronymic, birth_date, email, telephone_number, password, basic_edu,
         additional_edu, work_experience, personal_qualities,
         additionally, portfolio, achievements});
      await new student.save();
   }

}

module.exports = User;
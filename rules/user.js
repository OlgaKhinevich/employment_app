const M_Student = require("../models/student");
const M_Employer = require("../models/employer");
const AlertError = require("../lib/alert_error");
const nodemailer = require("nodemailer");

class User{

   static async signup_student(data={}){
      const {surname, name, patronymic, email, password, faculty, profession, gradebook_number, status} = data;
      if(!surname || !name || !patronymic || !email || !password || !faculty || !profession || !gradebook_number || !status) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error ("Wrong email!");
      const user = await M_Student.find({email});
      if(user.length > 0) throw new AlertError("Такой пользователь уже существует!");
      await (new M_Student ({
         surname, 
         name, 
         patronymic, 
         email, 
         password, 
         basic_edu: {higher_edu: {gradebook_number, faculty, profession}},
         status 
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
            [user] = await M_Employer.find({email});
            break;
         case "student":
            [user] = await M_Student.find({email});
            break;
         default: throw new Error("Wrong signin mode!");
      }
      if(!user) throw new AlertError("Пользователя не существует!");
      if(user.password !== password) throw new AlertError("Пароль неверный!");
      return  {_id: user._id, email, role: user.role};
   }

   static async edit_profile(data={}){    
      const {surname, name, patronymic, birth_date, email, password, telephone_number, basic_edu,
         additional_edu, work_experience, personal_qualities,
         additionally, portfolio, achievements} = data;
      if (!email) throw new Error("Wrong params!");
      const student = await M_Student.findOne({email});
      if(!student) throw new Error("Такого пользователя не существует!");
      Object.assign(student, {surname, name, patronymic, birth_date, email, telephone_number, password, basic_edu,
         additional_edu, work_experience, personal_qualities,
         additionally, portfolio, achievements});
      await student.save();
   }

   static async get_all_students() {
      return await M_Student.find({});
   }

   static async accept_student(data={}){
      let transporter = nodemailer.createTransport({
         host: "smtp.yandex.ru",
         port: 465,
         secure: true, 
         auth: {
           user: "olya-khinevich@yandex.ru", 
           pass: "xnat2699ol", 
         },
     });

      const {status, _id, email} = data;
      if(!status || !_id || !email) throw new Error("Wrong params!");
      await M_Student.updateOne({_id}, {status});
      await transporter.sendMail({
         from: "olya-khinevich@yandex.ru",
         to: email,
         subject: "Уведомление из приложения по трудоустройству выпускников",
         html: "Ваша заявка одобрена администратором. Для входа в систему воспользуйтесь паролем, указанным при регистрации"
      })
      return  { _id, status };
   }

   static async ban_student(data={}){

      let transporter = nodemailer.createTransport({
         host: "smtp.yandex.ru",
         port: 465,
         secure: true, 
         auth: {
           user: "olya-khinevich@yandex.ru", 
           pass: "xnat2699ol", 
         },
      });

      const {status, _id, reason, email} = data;

      await M_Student.updateOne({_id}, {status});
      await transporter.sendMail({
         from: "olya-khinevich@yandex.ru",
         to: email,
         subject: "Уведомление из приложения по трудоустройству выпускников",
         html: `Ваша заявка отклонена администратором и удалена из базы данных.
         Причина отклонения: ${reason}.
         Чтобы зарегистрироваться введите свои данные снова.
         `
      })
   }

   static async get_student({_id}) {
      return await M_Student.find({_id});    
   }

}

module.exports = User;
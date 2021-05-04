const M_Student = require("../models/student");
const M_Employer = require("../models/employer");

class User{

   static async signup_student(data={}){
      const {surname, name, patronymic, email, password, faculty, profession, gradebook_number} = data;
      if(!surname || !name || !patronymic || !email || !password || !faculty || !profession || !gradebook_number) throw new Error("Wrong params!");
      if(!email.includes("@")) throw new Error ("Wrong email!");
      await (new M_Student ({
         surname, 
         name, 
         patronymic, 
         email, password, 
         faculty, 
         profession, 
         gradebook_number
      })).save();   
   } 
   static async signup_employer(){
        
   }
   static async signin_student(data={}){
      const {email, password} = data;
      if (!email || !password) throw new Error("Wrong params!");
      //сonst db_email = await M_Student.find(email);
      if (!db_email) throw new Error("Wrong params!");
   }
   static async signin_employer(data={}){
      const {email, password} = data;
      if (!email || !password) throw new Error("Wrong params!");
   }
}

module.exports = User;
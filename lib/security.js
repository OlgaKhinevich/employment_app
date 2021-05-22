const jwt = require("jsonwebtoken");

class Security{

static generate_token(token_data){
  try{
    if(!token_data) throw new Error("Wrong params!");
    const {_id, email, role} = token_data;
    let info = {_id, email, role, timestamp: Date.now()};
    return jwt.sign(info, Security.secret_key, {expiresIn:"24h"});
  }
  catch(err){
    console.log(err);
    return {};
  }  
}
//check that current user have access role and exist in register
static isHaveAccess(token, accessRoles=[]){
   if(!token||!accessRoles||!accessRoles.length) throw new Error("Wrong params!");
     const token_data = jwt.verify(token, Security.secret_key);
   if(!token_data) throw new Error("Invalid token!");
     let {role} = token_data;
 
   if(!accessRoles.includes(role)) throw new Error("User has not access to this operation!");
   return token_data;
}

  //check JWT token of current user
  static jwtTokenCheck(token){
      if(!token) throw new Error("Wrong params!");
      return jwt.verify(token, Security.secret_key);
  }

  //generate secret key for JWT
  static generateSecretKey(length=70){
    let symbols = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890~!#$%^&*()_+{}:|?><>|[]=-.,";
    let secretKey = "";
    let range = symbols.length;
    for(let i=0; i<length; i++){
      let symbolIndex = Math.floor( Math.random() * range );
      secretKey += symbols[symbolIndex]; 
    }
  
    return secretKey;
  }


}

Security.secret_key = process.env.TOKEN_KEY || Security.generateSecretKey();


module.exports = Security;
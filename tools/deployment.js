const M_User = require('../models/user.js');
const db_connection = require('../config/db_connection.js');

async function create_admin(){
    try{
        const ADMIN_LOGIN = "admin";
        const ADMIN_PASSWORD = "1234567";
        const user = await M_User.findById(ADMIN_LOGIN);
        if(user) throw new Error("Админ уже существует!");
        await (new M_User({_id: ADMIN_LOGIN, password: ADMIN_PASSWORD}).save());
        console.log("Админ успешно создан!");
        process.exit();
    } 
    catch(err) {
        console.log(err);
    }
}

async function init(){
    await create_admin();
}


init();
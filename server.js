const express = require("express");
const app = express();
const path = require("path");
const cookie_parser = require("cookie-parser");

const db_connection = require('./config/db_connection');
const {PORT} = require('./config/connection');
const R_User = require('./routes/r_user');
const R_Vacancy = require('./routes/r_vacancy');
const R_Application = require('./routes/r_application');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public")  ));
app.use(cookie_parser());

app.post('/signup', R_User.signup);
app.post("/signin", R_User.signin);
app.post("/edit", R_User.edit_profile);
app.post("/addvacancy", R_Vacancy.add_vacancy);
app.post("/search", R_Vacancy.search_vacancy);
app.post("/students", R_User.get_all_students);
app.post("/acceptstudent", R_User.accept_student);
app.post("/banstudent", R_User.ban_student);
app.post("/getstudent", R_User.get_student);
app.post("/getcompanyvacancies", R_Vacancy.get_company_vacancies);
app.post("/deletevacancy", R_Vacancy.delete_vacancy);
app.post("/getallvacancies", R_Vacancy.get_all_vacancies);
app.post("/getcompany", R_Vacancy.get_company);
app.post("/addapplication", R_Application.add_application);
app.get("/getapplications", R_Application.get_applications);
app.post("/acceptapplication", R_Application.accept_application);
app.post("/rejectapplication", R_Application.reject_application);
app.get("/getallemployers", R_User.get_all_employers);
app.get("/getstatistics", R_User.get_statistics);

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`);
});


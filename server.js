const express = require("express");
const app = express();
const path = require("path");
const cookie_parser = require("cookie-parser");

const db_connection = require('./config/db_connection');
const {PORT} = require('./config/connection');
const R_User = require('./routes/r_user');
const R_Vacancy = require('./routes/r_vacancy');

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

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`);
});


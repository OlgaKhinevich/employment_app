const express = require("express");
const app = express();
const path = require("path");

const db_connection = require('./config/db_connection');
const {PORT} = require('./config/connection');
const R_User = require('./routes/r_user');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public")  ));

app.post('/signup', R_User.signup);
app.post("/signin", R_User.signin);
app.post("/edit", R_User.edit_profile);

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`);
});

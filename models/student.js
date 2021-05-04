const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6, maxLength: 15},
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    faculty: {type: String, required: true},
    profession: {type: String, required: true},
    gradebook_number: {type: String, required: true}, 
});

module.exports = mongoose.model("student", student);
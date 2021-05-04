const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employer = Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6, maxLength: 15},
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    company_name: {type: String, required: true},
    company_direction: {type: String, required: true},
    company_description: {type: String, required: true},
    website: {type: String}
});

module.exports = mongoose.model("employer", employer);
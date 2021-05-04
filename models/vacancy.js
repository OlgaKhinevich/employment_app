const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacancy = Schema({
    position: {type: String, required: true},
    min_salary: {type: Number, required: false},
    max_salary: {type: Number, required: false},
    professional_field: {type: String, required: true},
    employment_type: {type: String, required: true},
    work_schedule: {type: String, required: true},
    city: {type: String, required: false},
    address: {type: String, required: false},
    duties: {type: String, required: true},
    professional_skills: {type: String, required: true},
    personal_qualities: {type: String, required: true},
    working_conditions: {type: String, required: true},
    additionally: {type: String, required: false},
    phone_number: {type: String, required: false},
    email: {type: String, required: false}
});

module.exports = mongoose.model("vacancy", vacancy);

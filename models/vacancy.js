const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacancy = Schema({
    position: {type: String, required: true},
    min_salary: {type: Number},
    max_salary: {type: Number},
    professional_field: {type: String, required: true},
    employment_type: {type: String, required: true},
    work_schedule: {type: String, required: true},
    city: {type: String},
    address: {type: String},
    duties: {type: String, required: true},
    professional_skills: {type: String, required: true},
    personal_qualities: {type: String, required: true},
    working_conditions: {type: String, required: true},
    additionally: {type: String},
    phone_number: {type: String},
    email: {type: String},
    company: {type: String},
    is_closed: {type: Boolean},
});

module.exports = mongoose.model("vacancy", vacancy);

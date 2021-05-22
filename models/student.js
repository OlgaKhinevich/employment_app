const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = Schema({
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    birth_date: {type: String}, 
    password: {type: String, required: true, minLength: 6, maxLength: 15},
    telephone_number: {type: String, maxLength: 15},
    email: {type: String, required: true},
    basic_edu: {
        general_edu: {
            edu_institute: {type: String},
            grad_year: {type: Number, default: 0}
        },
        secondary_general_edu: {
            edu_institute: {type: String},
            grad_year: {type: Number, default: 0}
        },
        secondary_edu: {type: Array},
        higher_edu: {type: Array},
    },
    additional_edu: {type: Array},
    work_experience: {type: Array},
    professional_skills: {type: Array},
    personal_qualities: {type: String},
    additionally: {
        desired_salary: {type: Number, default: 0},
        employment: {type: String},
        work_schedule: {type: String},
        business_trips: {type: String},
        relocation: {type: String}
    },
    portfolio: {type: Array},
    achievements: {type: Array},
    status: {type: String, default: "нерассмотрен"},
    role: {type: String, default: "student"}
}, {versionKey: false});

module.exports = mongoose.model("student", student);
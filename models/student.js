const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = Schema({
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    birth_date: {type: Number}, 
    password: {type: String, required: true, minLength: 6, maxLength: 15},
    telephone_number: {type: String, maxLength: 15},
    email: {type: String, required: true},
    basic_edu: {
        general_edu: {
            edu_institute: {type: String},
            grad_year: {type: Number}
        },
        secondary_general_edu: {
            edu_institute: {type: String},
            grad_year: {type: Number}
        },
        secondary_edu: [],
        higher_edu: []
    },
    additional_edu: [],
    work_experience: [],
    professional_skills: [],
    personal_qualities: [String],
    additionally: {
        desired_salary: {type: Number},
        employment: {type: String, default: "любая"},
        work_schedule: {type: String, default: "любая"},
        business_trips: {type: String, default: "нет"},
        relocation: {type: String, default: "нет"}
    },
    portfolio: [],
    achievements: []
}, {versionKey: false});

module.exports = mongoose.model("student", student);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const application = Schema({
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    position: {type: String, required: true},
    company_name: {type: String, required: true},
    status: {type: String, required: true},
    cover_letter: {type: String},
    employer_answer: {type: String, required: true}
}, {versionKey: false});

module.exports = mongoose.model("application", application);
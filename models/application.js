const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const application = Schema({
    position: {type: String, required: true},
    company_name: {type: String, required: true},
    status: {type: Boolean, required: true}
}, {versionKey: false});

module.exports = mongoose.model("application", application);
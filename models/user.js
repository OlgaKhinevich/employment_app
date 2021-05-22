const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = Schema({
    _id: {type: String},
    password: {type: String},
    role: {type: String, default: "admin"}
});

module.exports = mongoose.model("user", user);
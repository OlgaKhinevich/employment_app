const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const news = Schema({
    news_title: {type: String, required: true},
    news_text: {type: String, required: true} 
});

module.exports = mongoose.model("news", news);
const mongoose = require("mongoose");

mongoose.connection
.on("open", ()=> console.log("MongoDB is connected!"))
.on("error", (err)=> console.log(err));

mongoose.connect("mongodb://localhost:27017/employment", {useNewUrlParser: true, useUnifiedTopology: true});
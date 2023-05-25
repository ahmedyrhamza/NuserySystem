const mongoose = require("mongoose");

// generate schema for teacher
const schema = new mongoose.Schema({
    _id: { type : mongoose.Schema.Types.ObjectId },
    fullName: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    image: String
});

// Mapping
mongoose.model("teachers", schema);  //can use as setter and getter to get the schema for its collection
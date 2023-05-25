const mongoose = require("mongoose");

// generate schema for child
const schema = new mongoose.Schema({
    _id: Number,
    fullname: {type:String, required:true},
    age: Number,
    level: String,
    address: { city: String, street: String, building: Number }
});

// Mapping
mongoose.model("children", schema);
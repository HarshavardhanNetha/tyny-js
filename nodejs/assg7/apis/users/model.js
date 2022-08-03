const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    dob: {type: String},
    branch: {type: String}
})

exports.userModel = mongoose.model("users", userSchema)
const mongoose = require("mongoose");

const agnetSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter your Firstname!"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter your Lastname!"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email!"],
        unique: [true, "This email is already in used!"]
    },
    gender: {
        type: String,
        required: [true, "Please Enter Your Gender!"],
    },
    password: {
        type: String,
        required: [true, "Please enter your Password!"]
    },
    superAdmin: {
        type: Boolean,
        required: [true, "Specify your role to access the flights management"],
        default: false
    },
    isAgent: {
        type: Boolean,
        required: [true, "Specify your role to access the flights management"],
        default: false
    }
}, {timestamps:  true});


module.exports = mongoose.model("Agents", agnetSchema);


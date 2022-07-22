const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter the Title!"]
    },
    firstName: {
        type: String,
        required: [true, "Please Enter your Firstname!"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter your Lastname!"]
    },
    birthDate: {
        type: Date,
        required: [true, "Please Enter your Birth Date!"]
    },
    roomNo: {
        type: Number,
        required: [true, "Please enter Room No!"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email!"],
        unique: [true, "This email is already in used!"]
    },
    status: {
        type: String,
        default: "Processing"
    },
    address: {
        type: String,
        required: [true, "Please enter your Address!"]
    },
    postCode: {
        type: Number,
        required: [true, "Please enter your Post Code!"]
    },
    city: {
        type: String,
        required: [true, "Please enter your City!"]

    },
    country: {
        type: String,
        required: [true, "Please enter your Country!"]

    }
}, { timestamps: true });


module.exports = mongoose.model("Guests", guestSchema);


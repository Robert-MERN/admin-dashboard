const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
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
    passengerId: {
        type: String,
    },
    departureDate: {
        type: Date,
        required: [true, "Please Enter departureDate!"]
    },
    arrivalDate: {
        type: Date,
        required: [true, "Please Enter arrivalDate!"]
    },
    departureLocation: {
        type: String,
        required: [true, "Please Enter departureLocation!"]
    },
    arrivalLocation: {
        type: String,
        required: [true, "Please Enter arrivalLocation!"]
    },
    airline: {
        type: String,
    },
    class: {
        type: String,
        default: "ECONOMY"
    },
    adults: {
        type: Number,
        default: 1
    },
    children: {
        type: Number,
        default: 0
    },
    infants: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Processing"
    },
    bookingStatus: {
        type: String,
        default: "Processing"
    },
    ticketPrice: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


module.exports = mongoose.model("Passengers", passengerSchema);


const express = require("express");
const app = express();
const firebase = require("./routes/firebase");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const passengerRoute = require("./routes/passengerRoute");
const guestRoute = require("./routes/guestRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const path = require("path");
dotenv.config();

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

// parsing to json body
app.use(express.json());

// connecting to database
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("The Connection with DB has been established!")
}).catch(err => console.log({ err, msg: "DB couldn't be connected!" }))
// using cors for differnet ports
app.use(cors());

// connecting front-end 
// app.use(express.static(path.join(__dirname, "/admin/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/admin/build', 'index.html'));
// });
// "heroku-postbuild": "cd admin && npm install && npm run build"

// router
app.use("/api/firebase", firebase);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/passenger", passengerRoute);
app.use("/api/guest", guestRoute);
// backend server
const server = app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is ready and running on " + process.env.PORT)
});

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})
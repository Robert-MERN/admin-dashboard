const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js");
const { verifySuperAdmin, verifyAgent } = require("./verification");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// jwt secret
const JWT = "axenholidays@321abc"
// encryption secret
const CJS = "holidaysaxen@123cba";

// creating agent accounts
router.post("/signup/agent", verifySuperAdmin, async (req, res) => {
    try {
        const { password, ...other } = req.body;
        const encrypted = cryptojs.AES.encrypt(password, process.env.CJS).toString();
        const userAgent = new userModel({ password: encrypted, ...other });
        await userAgent.save();
        res.status(200).json(userAgent);
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err })
    }
});


// logging in agents accounts

router.post("/login/agent", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const bytes = cryptojs.AES.decrypt(user.password, process.env.CJS);
            const decrypted = bytes.toString(cryptojs.enc.Utf8);
            if (decrypted === req.body.password) {
                const { password, superAdmin, isAgent, ...other } = user._doc;
                const token = jwt.sign({ superAdmin, isAgent }, process.env.JWT, { expiresIn: "7d" });
                res.status(200).json({ token, ...other, superAdmin, isAgent });
            } else {
                res.status(401).json({ error: true, message: "You entered a wrong Password!" });
            }
        } else {
            res.status(401).json({ error: true, message: "You entered a wrong Email!" });
        }
    } catch (err) {
        res.status(500).json({ error: err, message: "Internal Server Error!" });
    }
})



module.exports = router;
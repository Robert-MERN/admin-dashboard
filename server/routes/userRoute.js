const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const cryptojs = require("crypto-js");
const { verifySuperAdmin } = require("./verification");

// encryption secret
const CJS = "holidaysaxen@123cba";


// get all user
router.post("/find/all/:id", verifySuperAdmin, async(req ,res)=>{
    try{
        const users = await userModel.find();
        const selectedDetail = users.map((user)=> {
            const {password, ...other} = user._doc;
            return other;
        });
        const filteredAll = selectedDetail.filter((each)=> each._id.toString() !== req.params.id.toString()).sort((a, b)=> b.createdAt - a.createdAt); 
        res.status(200).json(filteredAll);
    } catch(err){
        res.status(401).json({success: false, message: "No user found!", Error: err});
    }
});

// get one user
router.post("/find/one/:id", verifySuperAdmin, async(req ,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const { password, ...other } = user._doc
        const unHashed = cryptojs.AES.decrypt(password, process.env.CJS);
        const decrypt  = unHashed.toString(cryptojs.enc.Utf8);
        res.status(200).json({...other, password: decrypt});
    } catch(err){
        res.status(401).json({error: true, message: "User isn't found!"});
    }
});

// delete user
router.delete("/delete/:id", verifySuperAdmin, async(req ,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "User is deleted!"});
    } catch(err){
        res.status(401).json({error: true, message: "User isn't deleted!"});
    }
});

// update user
router.put("/update/:id", verifySuperAdmin, async(req ,res)=>{
    try{
        if(req.body.password){
            const { password, ...other } = req.body;
            const encrypted = cryptojs.AES.encrypt(password, process.env.CJS).toString();
            await userModel.findByIdAndUpdate(req.params.id, {...other, password: encrypted});
            res.status(200).json({success: true, message: "User is updated!"});
        } else {
            await userModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({success: true, message: "User is updated!"});

        }
    } catch(err){
        res.status(401).json({error: true, message: "User isn't updated!"});
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const guestModel = require("../models/guestModel");
const { verifyAgent } = require("./verification");


// create
router.post("/create", verifyAgent, async(req ,res)=>{
    try{
        const guest = new guestModel(req.body);
        await guest.save();
        res.status(200).json(guest);
    } catch(err){
        res.status(401).json({success: false, message: "guest isn't created!"});
    }
});
// get all
router.post("/find", verifyAgent, async(req ,res)=>{
    try{
        const guests = await guestModel.find();
        res.status(200).json(guests);
    } catch(err){
        res.status(401).json({success: false, message: "No guests are found!"});
    }
});
// find one
router.post("/find/:id", verifyAgent, async(req ,res)=>{
    try{
        const guest = await guestModel.findById(req.params.id);
        res.status(200).json(guest);
    } catch(err){
        res.status(401).json({success: false, message: "No guest is found!"});
    }
});

// delete
router.delete("/delete/:id", verifyAgent, async(req ,res)=>{
    try{
        await guestModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "guest has been deleted!"});
    } catch(err){
        res.status(401).json({success: false, message: "Guest isn't deleted!"});
    }
});
// update
router.put("/update/:id", verifyAgent, async(req ,res)=>{
    try{
        await guestModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({success: true, message: "guest has been updated!"});
    } catch(err){
        res.status(401).json({success: false, message: "Guest isn't updated!"});
    }
});


module.exports = router;

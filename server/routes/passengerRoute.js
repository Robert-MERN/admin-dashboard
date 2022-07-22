const express = require("express");
const router = express.Router();
const passengerModel = require("../models/passengerModel");
const { verifyAgent } = require("./verification");


// create
router.post("/create", verifyAgent, async(req ,res)=>{
    try{
        const passenger = new passengerModel(req.body);
        await passenger.save();
        res.status(200).json(passenger);
    } catch(err){
        res.status(401).json({success: false, message: "Passenger isn't created!"});
    }
});
// get all
router.post("/find", verifyAgent, async(req ,res)=>{
    try{
        const passengers = await passengerModel.find();
        res.status(200).json(passengers);
    } catch(err){
        res.status(401).json({success: false, message: "No passengers are found!"});
    }
});
// find one
router.post("/find/:id", verifyAgent, async(req ,res)=>{
    try{
        const passenger = await passengerModel.findById(req.params.id);
        res.status(200).json(passenger);
    } catch(err){
        res.status(401).json({success: false, message: "No passenger is found!"});
    }
});

// delete
router.delete("/delete/:id", verifyAgent, async(req ,res)=>{
    try{
        await passengerModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "passenger has been deleted!"});
    } catch(err){
        res.status(401).json({success: false, message: "Passenger isn't deleted!"});
    }
});
// update
router.put("/update/:id", verifyAgent, async(req ,res)=>{
    try{
        await passengerModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({success: true, message: "passenger has been updated!"});
    } catch(err){
        res.status(401).json({success: false, message: "Passenger isn't updated!"});
    }
});


module.exports = router;

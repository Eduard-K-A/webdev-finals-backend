import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST create new user
router.post("/", async (req, res) => {
  try{
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    await newUser.save(); //saves to MONGODB
    res.status(201).json({success: true, user: newUser});
  }catch(err){
    
  }
});

export default router;

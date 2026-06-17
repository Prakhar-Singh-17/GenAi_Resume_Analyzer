import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import 'dotenv/config'
import jwt from "jsonwebtoken"

async function register(req,res){
const {username ,email ,password } = req.body;
if(!username || !email || !password )
{
    return res.status(400).json({
        message : "Details are missing"
    })
}
const existingUser = await userModel.findOne({email : email});
if(existingUser){
      return res.status(401).json({
        message : "User Already Exists"
    })
}
const hashedPassword = await bcrypt.hash(password,10);

const newUser = await userModel.create({username : username , email : email , password : hashedPassword})
.then(()=>{
    res.status(200).json({
        message : "User Created Successfully"
    })
})
.catch(e=>console.log(e));
}

async function login(req,res){
    const {email , password} = req.body;
    const existingUser = await userModel.findOne({email : email})

    if(!existingUser){
        res.status(404).json({
            message : "User does not exist"
        })
    }
    const matchPassword = await bcrypt.compare(password , existingUser.password);
    
    if(!matchPassword){
        res.status(401).json({
            message : "Wrong Password"
        })
    }
    const token = jwt.sign(existingUser.id,process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        "username" : existingUser.username,
        "message" : "User Logged In"
    })
}


export {register,login}
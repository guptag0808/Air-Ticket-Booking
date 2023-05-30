const express= require("express");
const {UserModel} = require("../models/userModel");
const userRoute= express.Router();
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")
require('dotenv').config()

userRoute.post("/register",async(req,res)=>{
	const {name,email,pass}=req.body;
	try{
		const check= await UserModel.findOne({email})
		if(check){
			res.send({"msg":"User Already Register Please Login "})
		}else{
			bcrypt.hash(pass, 5, async(err, hash) =>{
				if(err){
					res.send(err.message)
				}else{
                    const user = new UserModel({name,email,pass:hash})
					await user.save()
                     res. send({"msg":"Sucessfully Register",user})
				}
               
			})
		}
	}catch(err){
		res.send({"error":err.message})
	}
 })

//  login

userRoute.post("/login",async(req,res)=>{
	const {email,pass}=req.body
	try{
		const user= await UserModel.findOne({email})
		if(user){
			bcrypt.compare(pass, user.pass, (err, result)=> {
				if(result){
					const normal_token=jwt.sign({ userID:user._id }, process.env.JWT_NORMAL_TOKEN,{ expiresIn:"30m"});
					
					res.status(200).send({"msg":"Login Sucessfull","NormalToken":normal_token})
				}else{
                   res.status.send("Wrong Password")
				}
			})
		}else{
			res.status(404).send("Register First")
		}
	}catch(err){
		res.send(err.message)
	}
})



module.exports= {
	userRoute
}


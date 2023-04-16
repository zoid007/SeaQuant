import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import UserModel from "../mongoDB/models/user.js"

dotenv.config()
const secret = process.env.secret

export const signup = async(req,res) => {
    const {firstname, lastname, email, password} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});

        if(oldUser) return res.status(400).json({message:"User already exists"})

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await UserModel.create({
            email,
            password:hashedPassword,
            name:`${firstname} ${lastname}`
        })

        const token = jwt.sign({email:result.email, id:result._id},secret, {expiresIn:"1h"});
        res.status(201).json({result,token})

    } catch (error) {
        res.status(404).json({message:"something went wrong"})
        console.log(error);
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const oldUser = await UserModel.findOne({email});

        if(!oldUser) return res.status(400).json({message:"user does not exists"})

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message:"invalid credentials"})

        const token = jwt.sign({email:oldUser.email, id:oldUser._id},secret,{expiresIn:"1h"})

        res.status(200).json({result:oldUser,token})
    } catch (error) {
        res.status(404).json({message:"something went wrong"})
        console.log(error);
    }
}

export const googlelogin = async (req,res) => {
    const {email,name,googleId,token,dp} = req.body;

    try {
        const oldUser = await UserModel.findOne({email})
        
        if(oldUser){
            const result = {_id:oldUser._id.toString(),email,name,dp}
            return res.status(200).json({result,token})
        }

        const result = await UserModel.create({
            email,
            name,
            googleId
        })
        res.status(201).json({result,token})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error);
    }
}
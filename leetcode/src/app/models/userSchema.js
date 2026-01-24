import mongoose from 'mongoose';
const { Schema } = mongoose;
const{Problem} = require("../models/ProblemSchema")
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true, 
        trim:true,
        minLength:[5,"Username must be atleast 5 characters"],
        maxLength:[10,"Username can not exceed 10 characters"]

    },
    email:{
        type:String,
        required:[true,"Cmon now you know how making an account works provide your dam email"],
        unique:[true,"You already made an account, dont tell me you already forgot it"],
        lowercase:true,
        maxLength:[100,"Email cannot exceed 100 characters, are u trying to kill me here dam"],
        match: [/^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/, 'Please enter a valid email address']
    },password:{
        type:String,
        required:[true, "you really thought we would have an account with no password"],
        minLength:[5,"Password must atleast be 5 characters unless you want to get hacked which i doubt you do"],
        maxLength:[12,"Are you trying to compensate for something?"],
        trim:true,
        select:false
    },
    Problems:{
            type:Array,
            required:false, 
            Problem:[Problem]
    }
});
module.exports = userSchema

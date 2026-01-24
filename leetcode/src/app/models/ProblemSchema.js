import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;
const Problem = mongoose.Schema({
    ProblemType:{
        type:String,
        unique:true,
        required:true,
    },
    Problem:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        ProblemId:Id,
        createdAt: { type: Date, default: Date.now }

    },
    Score:{
        type:Number,
        required:true,
       minValue:1,
       maxValue:10,
    },
    Attempt:{
        type:Number, 
        required:true, 
        minLength:1 ,
        attemptNumber:{
            type:Number,
            required:true,
            minLength:1
        },
        usedHint:{
            type:Boolean,
            required:true
        }
    },
},{timestamps:true})
module.exports = {Problem}
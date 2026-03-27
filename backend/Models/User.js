import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    userImagePublicId:{
        type:String
    },
    userImg:{
        type:String
    }
}, {timestamps: true});

const users = mongoose.model("users", userSchema);

export default users;
import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
          type:String,
        required:true
    },
    price:{
          type:Number,
        required:true
    },
    duration:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    publicId:{
        type:String
    }
}, {timestamps:true});

const packages = mongoose.model("packages", packageSchema);

export default packages;
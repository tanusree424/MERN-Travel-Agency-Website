import mongoose from "mongoose";

const blogSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true,
        maxlength:250
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum : ["Adventure","Beach","Hill","Travel Tips","Family Trip"]
    },
    author:{
        type:String,
        required:true,
        default:"Admin"
    },
    tags:[
        {
            type:String
        }
    ],
    views:{
        type:Number,
        default:0
    },
    featured:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
    }
}, {timestamps:true});

const Blogs = mongoose.model("Blogs",blogSchema);

export default Blogs;
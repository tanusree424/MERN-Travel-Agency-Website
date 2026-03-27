import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
      type:String,
        required:true  
    },
    subject:{
        type:String
    },
    messages:{
        type:String,
        required:true
    }
} ,  {timestamps:true});


const Contacts = mongoose.model("contacts", contactSchema);

export default Contacts;
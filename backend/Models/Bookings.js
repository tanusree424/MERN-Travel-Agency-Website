import mongoose, { modelNames } from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"packages"
    },
    status: { type: String, default: "pending" }, // pending, completed
  createdAt: { type: Date, default: Date.now },
    date:{
         type: Date,
    required: true
    }
} ,{timestamps:true});


const Bookings = mongoose.model("Bookings", bookingSchema);

export default Bookings;
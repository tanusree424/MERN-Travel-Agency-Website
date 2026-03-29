import mongoose from "mongoose";

const reviewSchema =  new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"packages",
        required:true
    },
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bookings"
    },
    rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  comment: {
    type: String
  }

}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;

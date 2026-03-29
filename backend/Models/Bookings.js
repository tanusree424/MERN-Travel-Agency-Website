import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "packages"
  },

 status: {
  type: String,
  enum: ["pending", "confirmed", "completed"],
  default: "pending"
},

  date: {
    type: Date,
    required: true
  },

  //  NEW FIELDS
  reviewGiven: {
    type: Boolean,
    default: false
  },

  rating: {
    type: Number
  },

  comment: {
    type: String
  }

}, { timestamps: true });

const Bookings = mongoose.model("Bookings", bookingSchema);

export default Bookings;
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true 
  },
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "packages", 
    required: true 
  },
  name: { type: String, required: true }, // auto-fill from user
  photo: { type: String, required: true }, // user photo or default
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Testimonials = mongoose.model("testimonials", testimonialSchema);

export default Testimonials;
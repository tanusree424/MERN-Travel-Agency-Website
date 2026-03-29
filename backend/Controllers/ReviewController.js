// controllers/reviewController.js

import Review from "../Models/Review.js";
import Bookings from "../Models/Bookings.js";

export const createReview = async (req, res) => {
  try {

    const { bookingId, rating, comment } = req.body;

    const booking = await Bookings.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // create review
    const newReview = await Review.create({
      userId: req.user._id,
      packageId: booking.packageId,
      bookingId,
      rating,
      comment
    });

    // mark booking as reviewed
    await Bookings.findByIdAndUpdate(bookingId, {
      reviewGiven: true
    } , {new:true});

    res.json({
      message: "Review created successfully",
      review: newReview
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("userId")        //  full user details
      .populate("packageId")     //  package details
      .sort({ createdAt: -1 });

    res.status(200).json({reviews:reviews });

  } catch (error) {
    console.log(error);
  return   res.status(500).json(error?.message);
  }
};
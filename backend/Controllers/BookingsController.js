
import Bookings from "../Models/Bookings.js";
import packages from "../Models/Package.js";
import users from "../Models/User.js";
export const createBooking = async (req, res) => {
  try {
    const { userId, packageId, date } = req.body;

    if (!userId || !packageId || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new Bookings({
      userId,
      packageId,
      date,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find()
      .populate("packageId", "title price image description")
.populate("userId", "name email userImg")
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id; // middleware from user id

    const bookings = await Bookings.find({ userId })
      .populate("packageId", "title price image ") // package info
      .populate("userId", "name email phone address"); // optional

    if (!bookings.length) {
      return res.status(404).json({
        message: "No bookings found for this user",
      });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.id)
      .populate("userId", "name email")
      .populate("packageId", "title price");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // pending / completed
    const booking = await Bookings.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status || booking.status;
    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const booking = await Bookings.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingReview = async (req, res) => {
  try {

    const booking = await Bookings.findOne({
      userId: req.user._id,
      status: "completed",
      reviewGiven: false
    })
    .populate("packageId")
    .sort({ createdAt: -1 });

    if (!booking) {
      return res.status(200).json(null);
    }

    res.status(200).json(booking);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
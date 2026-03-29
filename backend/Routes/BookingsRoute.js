import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getMyBookings, getPendingReview, updateBookingStatus } from "../Controllers/BookingsController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const bookingRoutes =  express.Router();

bookingRoutes.post("/create",authMiddleware ,createBooking);
bookingRoutes.get("/get-bookings", authMiddleware, getAllBookings);
bookingRoutes.put("/edit-bookings/:id", authMiddleware, updateBookingStatus);
bookingRoutes.get("/one-booking/:id", authMiddleware, getBookingById);
bookingRoutes.delete("/remove/:id", authMiddleware, deleteBooking);
bookingRoutes.get("/my-bookings", authMiddleware , getMyBookings);
bookingRoutes.put("/update-status/:id", authMiddleware , updateBookingStatus);
bookingRoutes.get("/review-pending", authMiddleware , getPendingReview);
export default bookingRoutes;
import express from "express";
import { createReview, deleteReviews, getAllReviews } from "../Controllers/ReviewController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
const reviewRoutes =  express.Router();
reviewRoutes.post("/give-feedback", authMiddleware ,createReview);
reviewRoutes.get("/get-feedback", getAllReviews)
reviewRoutes.delete("/delete/:id", authMiddleware ,adminMiddleware,deleteReviews);

export default reviewRoutes;
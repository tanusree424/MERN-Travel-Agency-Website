import express from "express";
import { createReview, getAllReviews } from "../Controllers/ReviewController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const reviewRoutes =  express.Router();
reviewRoutes.post("/give-feedback", authMiddleware ,createReview);
reviewRoutes.get("/get-feedback", getAllReviews)

export default reviewRoutes;
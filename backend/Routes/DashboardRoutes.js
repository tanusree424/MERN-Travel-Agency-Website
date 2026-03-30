import express from "express";

import authMiddleware from "../Middleware/authMiddleware.js";
import { DashboardCount } from "../Controllers/DashboardController.js";
const DashboardRoutes =  express.Router();

DashboardRoutes.get("/count", authMiddleware , DashboardCount );

export default DashboardRoutes;
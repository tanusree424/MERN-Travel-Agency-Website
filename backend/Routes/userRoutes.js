import express from "express";
import { authUser, changeRole, DeleteProfile, getAllUsers, ProfileCreate } from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multer.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";

const userRoutes = express.Router();
userRoutes.get("/current-user", authMiddleware ,authUser );
userRoutes.put("/profile-create", authMiddleware, upload.single("image"), ProfileCreate);
userRoutes.put("/profile-create/:id", authMiddleware, upload.single("image"), ProfileCreate);
userRoutes.get("/all-users", authMiddleware , adminMiddleware , getAllUsers )
userRoutes.delete("/delete-profile", authMiddleware , DeleteProfile);
userRoutes.delete("/delete-profile/:id", authMiddleware , DeleteProfile);
userRoutes.put("/change-role",authMiddleware , adminMiddleware, changeRole);
export default userRoutes;
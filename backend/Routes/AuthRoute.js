import express from "express";
import { SignIn, signOut, Signup } from "../Controllers/AuthController.js";
import upload from "../Middleware/multer.js";

const authRoute = express.Router();

authRoute.post("/signup",upload.single("image") ,Signup);
authRoute.post("/signin", SignIn);
authRoute.get("/signout", signOut)

export default authRoute;
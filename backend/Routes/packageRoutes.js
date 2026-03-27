import express from "express";
import { createPackage, deletePackage, getPackages, getPackagesOnHomePage, getSinglePackage, updatePackage } from "../Controllers/PackageController.js";
import upload from "../Middleware/multer.js";
import authMiddleware from "../Middleware/authMiddleware.js";



const packageRouter = express.Router();

packageRouter.post("/create", authMiddleware , upload.single("image"), createPackage);
packageRouter.get("/all", getPackages);
packageRouter.get("/all-six", getPackagesOnHomePage);
packageRouter.get("/:id", getSinglePackage);
packageRouter.put("/update/:id", authMiddleware ,upload.single("image"), updatePackage);
packageRouter.delete("/delete/:id", deletePackage);

export default packageRouter;
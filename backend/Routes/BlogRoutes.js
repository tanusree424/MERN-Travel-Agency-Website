import express from "express"
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import { createBlog, deleteBlog, editBlog, getBlogs, singleBlog } from "../Controllers/BlogController.js";
import upload from "../Middleware/multer.js";

const blogRoutes = express.Router();
blogRoutes.post("/create", authMiddleware ,upload.single("image"), createBlog );
blogRoutes.get("/all-blogs"  , getBlogs);
blogRoutes.delete("/delete/:id", authMiddleware ,deleteBlog );
blogRoutes.put(
  "/edit-blog/:id",
  upload.single("image"),
  editBlog
);
blogRoutes.get("/blog/:id" , singleBlog)
export default blogRoutes;
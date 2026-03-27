import express from "express";
import { createContact, deleteContact, getAllContacts } from "../Controllers/ContactController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const contactRoute =express.Router();
contactRoute.post("/create",createContact);
contactRoute.get("/get-all", authMiddleware, getAllContacts);
contactRoute.delete("/delete", authMiddleware, deleteContact );

export default contactRoute;
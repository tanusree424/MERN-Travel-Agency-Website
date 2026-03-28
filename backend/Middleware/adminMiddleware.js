import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../Models/User.js";
dotenv.config();

const adminMiddleware = async (req,res,next) => {
    try {
       const token= req?.cookies?.token;
            if (!token) {
                return res.status(401).json({message:"Token Not Found"})
            }
            const decode =  jwt.verify(token , process.env.SECRETKEY);
            const user = await users.findById(decode._id);
            if (!user) {
                return res.status(404).json({message:"User Not found"})
            }

            if (user.role !=="Admin") {
                return res.status(403).json({ message: "Access Denied. Admin Only" });
            }

            req.user = user;
            next();  
    } catch (error) {
       return res.status(500).json({ message: error.message }); 
    }
}

export default adminMiddleware;
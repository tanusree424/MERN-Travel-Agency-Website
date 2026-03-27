import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req,res,next) => {
    try {
        const token= req?.cookies?.token;
        if (!token) {
            return res.status(401).json({message:"Token Not Found"})
        }
        const decode =  jwt.verify(token , process.env.SECRETKEY);

        req.user = decode.user
        next()

    } catch (error) {
        return res.status(401).json(
            {
                message:"Token Expired"
            }
        )
    }
}

export default authMiddleware;
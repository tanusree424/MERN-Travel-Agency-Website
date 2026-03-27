import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRETKEY =  process.env.SECRETKEY  || "TANUSREEBASUCHOUDHURY"
const genToken = async(user)=>{
    try {
        const token = await jwt.sign({user}, SECRETKEY , {expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log({message:"Error Creating Token"+ error?.message})
    }
}

export default genToken;

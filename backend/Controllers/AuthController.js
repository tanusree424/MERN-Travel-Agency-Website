import { cloudinaryUpload } from "../Config/Cloudinary.js";
import genToken from "../Config/Token.js";
import users from "../Models/User.js";
import bcrypt from "bcryptjs";
const Signup = async (req,res) => {
    try {
        const {name,email,password , phone, address } = req.body;
        const existingUser = await users. findOne({email});
        if(existingUser) return res.status(400).json({message:"User Already Exist"});
        let imageUrl;
        let imagePublicId;
        const hashedPassword = await bcrypt.hash(password,10);
        if (req.file) {
            const uploadFile = await cloudinaryUpload(req.file.path);
            imageUrl= uploadFile.secure_url;
            imagePublicId = uploadFile.public_id;

        }

        const user = await users.create({
            name , email, password:hashedPassword , phone , address , userImg:imageUrl , userImagePublicId:imagePublicId
        });

        return res.status(200).json({message:"User Created Successfully" , user});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({message:error?.message})
    }
}

const SignIn = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await users.findOne({email});
        if(!user) return res.status(404).json({message:"User Not Exist"});
        const isMatch  = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Password not matched"});
        }
        const token = await genToken(user);

      res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
        return res.status(200).json({
            message:"LoggedIn Successfully",
            user,
            token
        });


    } catch (error) {
        console.log({error:error?.message});
         return res.status(500).json(error?.message);
    }
}

const signOut = async (req,res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message:"LoggedOut Successfully"
    })
}

export {Signup , SignIn , signOut}
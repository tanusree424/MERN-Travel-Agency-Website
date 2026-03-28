import users from "../Models/User.js";
import jwt from "jsonwebtoken";
import dotenv from  "dotenv"
import cloudinary, { cloudinaryUpload } from "../Config/Cloudinary.js";
dotenv.config()
const authUser = async (req,res) => {
    try {
      const userId = req?.user?._id;
     // console.log(userId)
      const user =  await users.findById(userId).select("-password");

     return res.status(200).json(user)
        
    } catch (error) {
        console.log(error?.message)
    }
}

const ProfileCreate = async (req, res) => {
  try {
    //  dynamic userId
    const userId = req.params.id || req?.user?._id ;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const { name, address, phone } = req.body;

    //  existing user
    const existingUser = await users.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let userImg = existingUser.userImg;
    let userImagePublicId = existingUser.userImagePublicId;

    //  image upload
    if (req.file) {

      // optional: delete old image
      if (existingUser.userImagePublicId) {
        await cloudinary.uploader.destroy(existingUser.userImagePublicId);
      }

      const uploadedFile = await cloudinaryUpload(req.file.path);

      userImg = uploadedFile.secure_url;
      userImagePublicId = uploadedFile.public_id;
    }

    const user = await users.findByIdAndUpdate(
      userId,
      {
        name,
        address,
        phone,
        userImg,
        userImagePublicId,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated Successfully",
      user,
    });

  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: error?.message });
  }
};
 const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find().select("-password"); //  password hide

    return res.status(200).json({
      message: "Users fetched successfully",
      total: allUsers.length,
      users: allUsers
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to fetch users"
    });
  }
};

const DeleteProfile = async (req, res) => {
  try {

    //  dynamic userId
    const userId =   req.params.id || req?.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    //  find user
    const existingUser = await users.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //  delete image from cloudinary (if exists)
    if (existingUser.userImagePublicId) {
      await cloudinary.uploader.destroy(existingUser.userImagePublicId);
    }

    //  delete user
    await users.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User Deleted Successfully",
    });

  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: error?.message });
  }
};

const changeRole =  async (req,res) => {
  try {
    const {role , userId} = req.body;
    if (!role) {
      return res.status(400).json({message:"Role is Required"});
    }
    const user =  await users.findByIdAndUpdate(userId,{role:role},{new:true});
    return res.status(200).json({message:"Role Changed Successfully" , user});


  } catch (error) {
    console.log(error?.message)
  }
}

export {authUser , ProfileCreate , getAllUsers , DeleteProfile , changeRole}
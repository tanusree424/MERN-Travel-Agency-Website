import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUpload =  async (file) => {
  console.log("CLOUD NAME", process.env.CLOUD_NAME)
   const uploadFile= await cloudinary.uploader.upload(file,{
    folder:"travel-app"
   });
   return uploadFile;
}

export default cloudinary;
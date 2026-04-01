import { cloudinaryUpload } from "../Config/Cloudinary.js";
import Blogs from "../Models/Blog.js";
import fs from "fs"
const createBlog = async (req,res) => {
    try {
        const {title,slug , shortDescription,content,category,author, tags, views , featured , status } = req.body;
        const existingBlog = await Blogs.findOne({slug});
        if (existingBlog) {
            return res.status(400).json({message:"Slug Already Exist"})
        }
        let blogImage;
        if (req.file) {
            const blogImageFile =await cloudinaryUpload(req.file.path);
            blogImage =blogImageFile.secure_url;

            fs.unlink(req.file.path, (err)=>{
                if (err) {
                    console.log("Image Deleting Failed:",err)
                }
                else
                {
                    console.log("Local Image Deleted")
                }
            })
        }
        
        const blog = await Blogs.create({
            title,
            slug,
            shortDescription,
            image:blogImage,
            category,
            author,
            content,
            tags,
            views,
            featured,
            status

        });
        return res.status(201).json({message:"Blog Added Successfully", blog});
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getBlogs = async (req,res) => {
    try {
        const blogs =  await Blogs.find();
        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error?.message})
    }
}

const deleteBlog =  async (req,res) => {
    try {
        const {id} = req.params;
        const blog = await Blogs.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json({message:"Blog Deleted Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error?.message})
    }
}
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      shortDescription,
      content,
      category,
      author,
      tags,
      views,
      featured,
      status,
    } = req.body;

    let blogImage;

    let slug = req.body.slug;

    const existingBlog = await Blogs.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    if (req.file) {
      const blogImageFile = await cloudinaryUpload(req.file.path);
      blogImage = blogImageFile.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("Image Deleting Failed:", err);
        } else {
          console.log("Local Image Deleted");
        }
      });
    }

    const updateData = {
      title,
      slug,
      shortDescription,
      content,
      category,
      author,
      tags,
      views,
      featured,
      status,
    };

    if (blogImage) {
      updateData.image = blogImage;
    }

    const blog = await Blogs.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const singleBlog =  async (req,res) => {
    try {
        const {id} = req.params;
        const blog = await Blogs.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"})
            return res.status(200).json(blog)
        
    } catch (error) {
       console.log(error)
        return res.status(500).json({error:error?.message}) 
    }
}

export {createBlog , getBlogs , deleteBlog,  singleBlog ,editBlog}
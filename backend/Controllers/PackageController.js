import cloudinary, { cloudinaryUpload } from "../Config/Cloudinary.js";
import Package from "../Models/Package.js";


//  CREATE
 const createPackage = async (req, res) => {
  try {
    let image = null;
    let imagePublicId = null;

    if (req.file) {
      const uploaded = await cloudinaryUpload(req.file.path);
      image = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    const newPackage = await Package.create({
      ...req.body,
      image,
      imagePublicId
    });

    res.status(201).json({ message: "Package Created", package: newPackage });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET ALL
 const getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ packages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET SINGLE
 const getSinglePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const getPackagesOnHomePage = async (req, res) => {
  try {
    const packages = await Package.find().limit(6); // শুধু 6টা

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE
 const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    let image = pkg.image;
    let imagePublicId = pkg.imagePublicId;

    if (req.file) {
      if (pkg.imagePublicId) {
        await cloudinary.uploader.destroy(pkg.imagePublicId);
      }

      const uploaded = await cloudinaryUpload(req.file.path);
      image = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image,
        imagePublicId
      },
      { new: true }
    );

    res.json({ message: "Package Updated", package: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  DELETE
 const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (pkg.imagePublicId) {
      await cloudinary.uploader.destroy(pkg.imagePublicId);
    }

    await Package.findByIdAndDelete(req.params.id);

    res.json({ message: "Package Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export  {createPackage , getPackages , getSinglePackage ,updatePackage, deletePackage , getPackagesOnHomePage}
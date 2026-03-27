import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import api from '../../Api/Api'
import toast from 'react-hot-toast'

const AddPackageModal = ({ isOpen, onClose, packageData, refreshPackages }) => {

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  // 🔥 edit mode data load
  useEffect(() => {
    if (packageData) {
      setForm({
        title: packageData.title || "",
        location: packageData.location || "",
        price: packageData.price || "",
        duration: packageData.duration || "",
        description: packageData.description || "",
        image: null
      });

      setPreview(packageData.image || null);
    } else {
      setForm({
        title: "",
        location: "",
        price: "",
        duration: "",
        description: "",
        image: null
      });
      setPreview(null);
    }
  }, [packageData]);

  if (!isOpen) return null;

  // 🔥 input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 image handle
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("price", form.price);
    formData.append("duration", form.duration);
    formData.append("description", form.description);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      let res;

      if (packageData) {
        //  UPDATE
        res = await api.put(`/package/update/${packageData._id}`, formData , {withCredentials:true});
        toast.success("Package Updated");
      } else {
        //  CREATE
        res = await api.post(`/package/create`, formData , {withCredentials:true});
        toast.success("Package Created");
      }

      refreshPackages();
      onClose();

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

      <div className='bg-white p-6 rounded-lg w-[500px]'>

        <h2 className='text-xl font-bold mb-4 text-center'>
          {packageData ? "Edit Package" : "Add Package"}
        </h2>

        {/* 🔥 Image Upload */}
        <div className="flex justify-center mb-4">
          <div className="relative w-[120px] h-[120px] rounded-full border-2 border-gray-300 flex justify-center items-center overflow-hidden">

            {
              preview ? (
                <img src={preview} className='w-full h-full object-cover' />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )
            }

            <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
              <FaCamera size={14} />
              <input type="file" className="hidden" onChange={handleImage} />
            </label>

          </div>
        </div>

        {/* 🔥 Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

          <input
            type="text"
            name="title"
            placeholder="Package Title"
            className='border p-2 rounded'
            value={form.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className='border p-2 rounded'
            value={form.location}
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className='border p-2 rounded w-full'
              value={form.price}
              onChange={handleChange}
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g. 5 Days)"
              className='border p-2 rounded w-full'
              value={form.duration}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className='border p-2 rounded'
            value={form.description}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex justify-between mt-3">

            <button
              type="submit"
              className='bg-green-600 text-white px-4 py-2 rounded'
            >
              {packageData ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className='bg-red-500 text-white px-4 py-2 rounded'
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default AddPackageModal;
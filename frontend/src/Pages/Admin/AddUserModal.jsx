import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCamera } from 'react-icons/fa'
import api from '../../Api/Api';

const AddUserModal = ({ isOpen, onClose, userData, refreshUsers, viewMode }) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: null
  });

  const [preview, setPreview] = useState(null);
console.log(userData)
  //  load data for edit/view
  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        phone: userData.phone || "",
        address: userData.address || "",
        image: userData?.userImg
      });

      setPreview(userData?.userImg || null);
    } else {
      // reset for add
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        image: null
      });
      setPreview(null);
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // image handle
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  //  submit (add + edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      if (userData) {
        //  EDIT
        await api.put(`/user/profile-create/${userData._id}`, formData);
        toast.success("User Updated");
      } else {
        //  ADD
        await api.post("/auth/signup", formData);
        toast.success("User Created");
      }

      refreshUsers();
      onClose();

    } catch (error) {
      console.log(error?.response?.data?.message
        ||error?.message);
      toast.error(error?.response?.data?.message|| error?.message||"Something went wrong");
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

      <div className='bg-white p-6 rounded-lg w-[450px]'>

        <h2 className='text-xl font-bold mb-4 text-center'>
          {viewMode ? "View User" : userData ? "Edit User" : "Add User"}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <div className="relative w-[100px] h-[100px] rounded-full border overflow-hidden">

           {
  preview ? (
    <img 
      src={preview} 
      className='w-full h-full object-cover' 
    />
  ) : (
    <span className="text-gray-400 text-sm">No Image</span>
  )
}
            {/*  view mode-এ camera hide */}
            {!viewMode && (
              <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                <FaCamera size={14} />
                <input type="file" hidden onChange={handleImage} />
              </label>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

          <div className="flex gap-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              disabled={viewMode}
              className='border p-2 rounded w-full'
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={viewMode}
              className='border p-2 rounded w-full'
            />
          </div>

          <div className="flex gap-2">
            <input
              name="password"
              onChange={handleChange}
              placeholder="Password"
              disabled={viewMode}
              className='border p-2 rounded w-full'
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              disabled={viewMode}
              className='border p-2 rounded w-full'
            />
          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            disabled={viewMode}
            className='border p-2 rounded'
          />

          <div className="flex justify-between mt-3">

            {/*  view mode-এ save button hide */}
            {!viewMode && (
              <button className='bg-green-600 text-white px-4 py-2 rounded'>
                {userData ? "Update" : "Save"}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className='bg-red-500 text-white px-4 py-2 rounded'
            >
              Close
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default AddUserModal;
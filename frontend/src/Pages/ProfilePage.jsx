import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import api from "../Api/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { userData , setUserData } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        image: null || ""

    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setForm({
            ...form,
            image: file,
            preview: URL.createObjectURL(file)
        });
    };

    const handleUpdate = async (e, userId) => {
        e.preventDefault();
        console.log("form",form); // এখানে API call করবে
        const formData = new FormData();
        formData.append("name",form.name);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("image", form.image);

        try {
            const response = await api.put(`/user/profile-create/${userId}`, formData, { withCredentials: true });
            toast.success(response?.data?.message);
           navigate("/")
           setUserData(response?.data?.user)
        } catch (error) {
            console.log(error?.response?.data?.message || error?.message);
            toast.error(error?.response?.data?.message || error?.message);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-xl p-8 w-[420px]">

                {!editMode ? (

                    <>
                        <div className="flex flex-col items-center">

                            <img
                                src={userData?.userImg ? userData.userImg : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                alt=""
                                className="w-[100px] h-[100px] shadow-lg object-cover rounded-full mb-4"
                            />

                            <span className="text-2xl text-wrap font-bold">{userData?.name}</span>

                            <p className="text-gray-500">{userData?.email}</p>
                            <p className="text-gray-500">{userData?.phone}</p>

                            <p className="text-gray-500">{userData?.address}</p>
                            <p className="bg-blue-500 text-white px-3 py-1 rounded-full mt-2">
                                {userData?.role}
                            </p>

                        </div>

                        <div className="mt-6">

                            <button
                                onClick={() => setEditMode(true)}
                                className="w-full bg-black text-white py-2 rounded-lg mb-3"
                            >
                                Edit Profile
                            </button>

                            <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                                Logout
                            </button>

                        </div>
                    </>

                ) : (

                   <form onSubmit={(e) => handleUpdate(e, userData?._id)} className="flex flex-col gap-4">

                        <h2 className="text-2xl font-bold text-center mb-2">
                            Edit Profile - {userData?.name}
                        </h2>

                        <div className="flex flex-col gap-[12px] items-center">

                            <img
                                src={form.preview || userData?.userImg}
                                className="w-[100px] h-[100px] object-cover rounded-full mb-2"
                                alt=""
                            />

                            {/* Image Upload */}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="border p-2 rounded w-full"
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="border p-2 rounded w-full"
                            />
                            <textarea

                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-2 rounded w-full"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-[12px] rounded w-full"
                            >
                                Update Profile
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="bg-gray-400 text-white py-2 px-[12px] rounded w-full"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
};

export default Profile;
import React, { useState, useContext, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import Nav from "../Component/Nav.jsx";
import Footer from "../Component/Footer.jsx";
import api from "../Api/Api.js";
import toast from "react-hot-toast";


const BookingPage = () => {
  const { id } = useParams(); // URL থেকে packageId
  const { userData } = useContext(UserContext);
    const navigate =  useNavigate();
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: "",
    date: "",
  });
  console.log(id);
  // Form input handle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handle
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/bookings/create", 
      {
        userId: userData._id,    
        packageId: id,    
        date: formData.date,
      }
    );

    console.log("Booking Response:", response.data);
    navigate("/my-bookings")
    toast.success("Booking submitted successfully!");
    setFormData({ name: "", email: "", phone: "", date: "" }); // ফর্ম reset
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    toast.error("Booking failed. Try again!");
  }
};

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
      <div className="max-w-md h-[65vh] w-full bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Book Your Trip</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123-456-7890"
              required
            />
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Travel Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default BookingPage;
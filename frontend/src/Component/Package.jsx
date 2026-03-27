import React, { useEffect, useState, useContext } from 'react';
import api from '../Api/Api';
import { UserContext } from '../Context/UserContext.jsx'; // named context import
import { useNavigate } from 'react-router-dom';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const { userData } = useContext(UserContext); // ✅ destructure directly
  const navigate = useNavigate();

  const getPackages = async () => {
    try {
      const res = await api.get("/package/all-six");
      console.log(res.data)
      setPackages(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const handleBookNow = (packageId) => {
    if (!userData) navigate("/login");
    else navigate(`/bookings/${packageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-5">
      <h2 className="text-3xl font-bold text-center mb-12">
        Explore Travel Packages ✈️
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-5">
        {packages?.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            <div className="h-[200px] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.location}</p>
              <p className="text-sm mt-2 text-gray-600">{item.description?.slice(0, 60)}...</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-600 font-bold text-lg">₹{item.price}</span>
                <span className="text-sm text-gray-500">{item.duration}</span>
              </div>

              <button
                onClick={() => handleBookNow(item._id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
import React, { useEffect, useState } from "react";
import api from "../../Api/Api";

const AdminHome = () => {
  const [counts, setCounts] = useState({
    totalPackages: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalFeedback: 0,
    totalQueries: 0,
  });

  const getDashboardCounts = async () => {
    try {
      const response = await api.get("/dashboard/count", {
        withCredentials: true,
      });
      console.log(response.data

      )
      setCounts({
        totalPackages: response.data.totalPackages,
        totalUsers: response.data.users,
        totalBookings: response.data.bookings,
        totalFeedback: response.data.reviews,
        totalQueries: response.data.contacts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardCounts();
  }, []);

  return (
    <div className="w-full p-6 bg-gray-100 ">
     
      <div className="flex flex-nowrap gap-6">

        {/* Packages */}
        <div className="bg-white shadow-lg rounded-xl w-[220px] overflow-hidden hover:scale-105 transition duration-300">
          <div className="bg-blue-500 p-3 text-white">
            <h3 className="text-lg font-semibold">Packages</h3>
          </div>

          <div className="p-5 text-center">
            <h6 className="text-gray-600 mb-2">Total Packages</h6>
            <h1 className="text-4xl font-bold text-blue-500">
              {counts.totalPackages}
            </h1>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white shadow-lg rounded-xl w-[220px] overflow-hidden hover:scale-105 transition duration-300">
          <div className="bg-green-500 p-3 text-white">
            <h3 className="text-lg font-semibold">Users</h3>
          </div>

          <div className="p-5 text-center">
            <h6 className="text-gray-600 mb-2">Total Users</h6>
            <h1 className="text-4xl font-bold text-green-500">
              {counts.totalUsers}
            </h1>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white shadow-lg rounded-xl w-[220px] overflow-hidden hover:scale-105 transition duration-300">
          <div className="bg-purple-600 p-3 text-white">
            <h3 className="text-lg font-semibold">Bookings</h3>
          </div>

          <div className="p-5 text-center">
            <h6 className="text-gray-600 mb-2">Total Bookings</h6>
            <h1 className="text-4xl font-bold text-purple-600">
              {counts.totalBookings}
            </h1>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white shadow-lg rounded-xl w-[220px] overflow-hidden hover:scale-105 transition duration-300">
          <div className="bg-orange-500 p-3 text-white">
            <h3 className="text-lg font-semibold">Feedback</h3>
          </div>

          <div className="p-5 text-center">
            <h6 className="text-gray-600 mb-2">Total Feedback</h6>
            <h1 className="text-4xl font-bold text-orange-500">
              {counts.totalFeedback}
            </h1>
          </div>
        </div>

        {/* Contact Queries */}
        <div className="bg-white shadow-lg rounded-xl w-[220px] overflow-hidden hover:scale-105 transition duration-300">
          <div className="bg-pink-500 p-3 text-white">
            <h3 className="text-lg font-semibold whitespace-nowrap">
              Contact Queries
            </h3>
          </div>

          <div className="p-5 text-center">
            <h6 className="text-gray-600 mb-2">Total Queries</h6>
            <h1 className="text-4xl font-bold text-pink-500">
              {counts.totalQueries}
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
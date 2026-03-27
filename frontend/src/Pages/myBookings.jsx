import React, { useContext, useEffect, useState } from "react";
import Nav from "../Component/Nav";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../Api/Api";
import { UserContext } from "../Context/UserContext";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userData} = useContext(UserContext);

  // Fetch user bookings
  const fetchMyBookings = async () => {
    try {
      const res = await api.get(
        "/bookings/my-bookings",
        {
         withCredentials:true
        }
      );

      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">
            No bookings found 😔
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5"
              >
                {/* Package Image */}
                <img
                  src={booking.packageId?.image}
                  alt="package"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Package Title */}
                <h3 className="text-xl font-semibold mb-2">
                  {booking.packageId?.title}
                </h3>

                {/* Price */}
                <p className="text-gray-700 mb-1">
                  💰 Price: ₹{booking.packageId?.price}
                </p>

                {/* Travel Date */}
                <p className="text-gray-700 mb-1">
                  📅 Date:{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>

                {/* Booking Status */}
                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {booking.status}
                </p>

                {/* Booking Time */}
                <p className="text-gray-500 text-sm mt-3">
                  Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
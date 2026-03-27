import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../Api/Api";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // সব package fetch
  const fetchPackages = async () => {
    try {
      const res = await api.get("/package/all");
      console.log(res.data.packages)
      setPackages(res.data.packages);
    } catch (error) {
      toast.error("Failed to load packages");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          All Travel Packages
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : packages.length === 0 ? (
          <p className="text-center text-gray-600">
            No packages available 😔
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages?.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Image */}
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {pkg.description?.slice(0, 80)}...
                  </p>

                  <p className="text-lg font-bold text-blue-600 mb-3">
                    ₹{pkg.price}
                  </p>

                  <button
                    onClick={() => navigate(`/bookings/${pkg._id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPackages;
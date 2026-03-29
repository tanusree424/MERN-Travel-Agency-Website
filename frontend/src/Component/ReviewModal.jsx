import React, { useState } from "react";
import api from "../Api/Api";
import toast from "react-hot-toast";

const ReviewModal = ({ data, onClose }) => {

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {

    const response=  await api.post("/reviews/give-feedback", {
        bookingId: data._id,
        rating,
        comment
      }, { withCredentials: true });

      toast.success(response.data.message);
      onClose();

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-bold mb-3">
          Rate Your Trip 🌍
        </h2>

        <p className="mb-3 text-gray-600">
          {data?.packageId?.title}
        </p>

        {/* Rating */}
        <select
          className="border p-2 w-full mb-3"
          onChange={(e) => setRating(e.target.value)}
        >
          <option>Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        {/* Comment */}
        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Write your experience..."
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Submit Review
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-400 text-white py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default ReviewModal;
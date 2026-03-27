import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../../Api/Api";
import toast from "react-hot-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // "user" | "package"
const [selectedData, setSelectedData] = useState(null);
const openUserModal = (user) => {
  setModalType("user");
  setSelectedData(user);
  console.log("user", user)
};

const openPackageModal = (pkg) => {
  setModalType("package");

  setSelectedData(pkg);
  
};

const closeModal = () => {
  setModalType(null);
  setSelectedData(null);
};

  // Fetch all bookings
  const fetchAllBookings = async () => {
    try {
      const response = await api.get("/bookings/get-bookings", {
        withCredentials: true,
      });

      setBookings(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  // Status update
  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/bookings/update-status/${id}`, { status });
      toast.success("Status updated");
      fetchAllBookings();
    } catch (error) {
      toast.error( error?.response?.data?.message || error?.message||"Failed to update status");
    }
  };

  // Columns
  const columns = [
   {
  name: "User",
  cell: (row) => (
    <span
      onClick={() => openUserModal(row.userId)}
      className="text-blue-600 cursor-pointer underline"
    >
      {row.userId?.name}
    </span>
  ),
},

    {
      name: "Email",
      selector: (row) => row.userId?.email,
    },
   {
  name: "Package",
  cell: (row) => (
    <span
      onClick={() => openPackageModal(row.packageId)}
      className="text-blue-600 cursor-pointer underline"
    >
      {row.packageId?.title}
    </span>
  ),
},
    {
      name: "Price",
      selector: (row) => `₹${row.packageId?.price}`,
      sortable: true,
    },
    {
      name: "Travel Date",
      selector: (row) =>
        new Date(row.date).toLocaleDateString(),
    },
    {
      name: "Status",
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) =>
            handleStatusChange(row._id, e.target.value)
          }
          className={`px-2 py-1 rounded ${
            row.status === "completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      ),
    },
    {
      name: "Booked On",
      selector: (row) =>
        new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        All Bookings
      </h2>

      <div className="bg-white rounded-xl shadow-md p-4">
        <DataTable.default
          columns={columns}
          data={bookings}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </div>
      {modalType && selectedData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-600 text-xl"
      >
        ✖
      </button>

      {/* USER MODAL */}
      {modalType === "user" && (
        <div>
          <h2 className="text-xl font-bold mb-4">User Details</h2>
           <img
            src={selectedData.userImg}
            alt="package"
            className="w-[120px] h-[120px] align-middle object-cover rounded-full mb-4"
          />
          <p><strong>Name:</strong> {selectedData.name}</p>
          <p><strong>Email:</strong> {selectedData.email}</p>
          <p><strong>Phone:</strong> {selectedData.phone}</p>
          <p><strong>Address:</strong> {selectedData.address}</p>
        </div>
      )}

      {/* PACKAGE MODAL */}
      {modalType === "package" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Package Details</h2>

          <img
            src={selectedData.image}
            alt={selectedData}
            className="w-full h-40 object-cover rounded mb-4"
          />

          <p><strong>Title:</strong> {selectedData.title}</p>
          <p><strong>Price:</strong> ₹{selectedData.price}</p>
          <p className="mt-2 text-gray-600">
            {selectedData.description}
          </p>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default Bookings;
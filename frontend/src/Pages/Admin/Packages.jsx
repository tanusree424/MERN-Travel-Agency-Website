import React, { useEffect, useState } from 'react'
import api from '../../Api/Api';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash ,FaPlusCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import AddPackageModal from './AddPackageModal';
// import PackageModal from './PackageModal'; // 👉 পরে বানাবে

const Packages = () => {

  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPackage, setEditPackage] = useState(null);

  //  fetch packages
  const getPackages = async () => {
    try {
      const res = await api.get("/package/all");
      setPackages(res.data.packages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  //  delete package
  const deletePackage = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        const res = await api.delete(`/package/delete/${id}` ,{withCredentials:true});
        toast.success(res?.data?.message);
        getPackages();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  //  table columns
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "70px"
    },
    {
      name: "Image",
      cell: (row) => (
        <img 
          src={row.image} 
          alt="pkg" 
          className="w-[60px] h-[40px] object-cover rounded"
        />
      )
    },
    {
      name: "Title",
      selector: row => row.title,
      sortable: true
    },
    {
      name: "Location",
      selector: row => row.location,
      sortable: true
    },
    {
      name: "Price",
      selector: row => `₹${row.price}`,
      sortable: true
    },
    {
      name: "Duration",
      selector: row => row.duration
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditPackage(row);
              setShowModal(true);
            }}
            className='px-2 py-1 bg-yellow-400 rounded text-white flex items-center gap-1'
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={() => deletePackage(row._id)}
            className='px-2 py-1 bg-red-500 rounded text-white flex items-center gap-1'
          >
            <FaTrash /> Delete
          </button>

        </div>
      )
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold'>Packages</h2>

        <button
          className='px-4 py-2 bg-green-600 text-white rounded flex justify-center items-center gap-[10px]'
          onClick={() => {
            setEditPackage(null);
            setShowModal(true);
          }}
        >
        <FaPlusCircle/>  Add Package
        </button>
      </div>

      {/*  DataTable */}
      <DataTable.default
        columns={columns}
        data={packages}
        pagination
        paginationPerPage={5}
        highlightOnHover
        striped
      />

      {/*  Modal (later connect) */}
      {
  showModal && (
    <AddPackageModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      packageData={editPackage}
      refreshPackages={getPackages}
    />
  )
}
    </>
  )
}

export default Packages;
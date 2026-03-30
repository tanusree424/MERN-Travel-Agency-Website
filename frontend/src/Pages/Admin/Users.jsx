import React, { useEffect, useState } from 'react'
import api from '../../Api/Api';
import AddUserModal from './AddUserModal';
import DataTable from "react-data-table-component"
import { FaEdit, FaEye } from "react-icons/fa";
import { FaDeleteLeft } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  //  fetch users
  const getUsers = async () => {
    try {
      const res = await api.get("/user/all-users");
      console.log(res.data)
      setUsers(res.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("DataTable:", DataTable);

  useEffect(() => {
    getUsers();
  }, []);

  //  delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        const response = await api.delete(`/user/delete-profile/${id}`);
        toast.success(response?.data?.message);
        getUsers();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };
  const handleRoleChange = async (rowId, role) => {
    try {
      const response = await api.put("/user/change-role" , {role:role , userId:rowId} , {withCredentials:true});
      toast.success(response?.data?.message)
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message);
    }
  }
  //  table columns
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "70px"
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
   {
  name: "Role",
  cell: row => (
    <>
      <select onChange={(e) => handleRoleChange(row._id, e.target.value)} defaultValue={row.role}>
        {
          ["Admin", "user"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))
        }
      </select>
    </>
  )
},
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditUser(row);
              setShowModal(true);
            }}
            className='px-2 py-1 bg-yellow-400 rounded text-white flex items-center gap-1'
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={() => {
              setEditUser(row);
              setShowModal(true);
            }}
            className='px-2 py-1 bg-blue-500 rounded text-white flex items-center gap-1'
          >
            <FaEye /> View
          </button>

          <button
            onClick={() => deleteUser(row._id)}
            className='px-2 py-1 bg-red-500 rounded text-white flex items-center gap-1'
          >
            <FaDeleteLeft /> Delete
          </button>

        </div>
      )
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold'>Users</h2>

        <button
          className='px-4 py-2 bg-green-600 text-white rounded'
          onClick={() => {
            setEditUser(null);
            setShowModal(true);
          }}
        >
          Add Users
        </button>
      </div>

      {/* 🔥 DataTable */}
      <DataTable.default
  columns={columns}
  data={users}
  pagination
  paginationPerPage={5}
/>

      {/* Modal */}
      {
        showModal && (
          <AddUserModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            userData={editUser}
            refreshUsers={getUsers}
          />
        )
      }
    </>
  )
}

export default Users;
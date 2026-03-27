import React from 'react'

const AdminHome = () => {
  return (
    <div className="flex w-full flex-wrap gap-4 justify-center">

      <div className="border border-2  w-[220px]">
        <div className="bg-blue-500 p-2 text-white">
          <h3>Packages</h3>
        </div>
        <div className="card-body">
          <h6>Total Packages:</h6>
        </div>
      </div>

      <div className="border border-2 w-[220px]">
        <div className="p-2 bg-green-500 text-white">
          <h3>Users</h3>
        </div>
        <div className="card-body">
          <h6>Total Users:</h6>
        </div>
      </div>

      <div className="border border-2 w-[220px]">
        <div className="bg-purple-600 p-2 text-white">
          <h3>Bookings</h3>
        </div>
        <div className="card-body">
          <h6>Total Bookings:</h6>
        </div>
      </div>
      <div className="border border-2 w-[220px]">
        <div className="bg-pink-600 p-2 text-nowrap text-white">
          <h3>Contact Queries</h3>
        </div>
        <div className="card-body">
          <h6>Total Queries:</h6>
        </div>
      </div>

    </div>
  );
};

export default AdminHome;
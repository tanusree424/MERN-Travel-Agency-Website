import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-screen w-[220px] flex flex-col items-center bg-[#252525]'>

      <h4 className='text-center text-wrap font-bold text-white px-[10px] py-[12px]'>
        Admin Dashboard
      </h4>

      <hr className='border border-gray-500 w-full' />

      <ul className="flex flex-col gap-3 m-0 p-0">

        <li className='w-full'>
          <Link 
            to="/admin/users"
            className='block text-white text-2xl text-decoration-none px-3 py-2 rounded hover:bg-sky-600 transition'
          >
            Users
          </Link>
        </li>

        <li className='w-full'>
          <Link 
            to="/admin/packages"
            className='block text-decoration-none text-2xl  text-white px-3 py-2 rounded hover:bg-sky-600 transition'
          >
            Package
          </Link>
        </li>
        
        <li className='w-full'>
          <Link 
            to="/admin/bookings"
            className='block text-decoration-none text-2xl  text-white px-3 py-2 rounded hover:bg-sky-600 transition'
          >
            Bookings
          </Link>
        </li>
        
        <li className='w-full'>
          <Link 
            to="/admin/packages"
            className='block text-decoration-none text-2xl  text-white px-3 py-2 rounded hover:bg-sky-600 transition'
          >
            Contact Queries
          </Link>
        </li>
        
        <li className='w-full'>
          <Link 
            to="/admin/packages"
            className='block text-decoration-none text-2xl  text-white px-3 py-2 rounded hover:bg-sky-600 transition'
          >
            Logout
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar
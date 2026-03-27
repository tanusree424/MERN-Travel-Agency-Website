import React from 'react'
import Logo from  "../assets/Travel-Agency-Logo.png"
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
   <div className="bg-blue-400 sticky top-0 h-[100px] w-full flex items-center shadow-2xl">
    <div className="w-[30%] flex gap-[15x] py-[12px] px-[15px]">
     <div className="rounded-full h-[80px]  w-[80px]">
      <Link to={"/"}>
<img src={Logo} alt="" className='object-cover rounded-full' /></Link>


     </div>
    </div>
    <div className="w-[40%]">
    <ul className="flex justify-center items-center gap-[10px]">
    <li className='bg-black p-2 rounded-2xl'>
        <Link to={"/"} className='text-white'>Home</Link>
    </li>
     <li className='bg-black p-2 rounded-2xl'>
        <Link to={"/about"} className='text-white'>About</Link>
    </li>
      <li className='bg-black p-2 rounded-2xl'>
        <Link to={"/my-bookings"} className='text-white'>Bookings</Link>
    </li>
      <li className='bg-black p-2 rounded-2xl'>
        <Link to={"/packages"} className='text-white'>Packages</Link>
    </li>
      <li className='bg-black p-2 rounded-2xl'>
        <Link to={"/contacts"} className='text-white'>Contacts</Link>
    </li>
    </ul>
    </div>
    <div className="w-[30%] ">
    <button className='bg-black px-[12px] py-[8px] rounded-full text-white 
    cursor-pointer px-[15px] py-[12px]'>
        Account Settings
    </button>
    </div>
   </div>
  )
}

export default Nav
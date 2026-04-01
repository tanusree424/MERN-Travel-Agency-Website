import React, { useState , useContext ,useEffect } from "react";
import Logo from "../assets/Travel-Agency-Logo.png";
import { Link ,useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import api from "../Api/Api";
import toast from "react-hot-toast";

const Nav = () => {
  const [openAccountSetting, setOpenAccountSetting] = useState(false);
  const [user, setuser] = useState(null)
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate()
 useEffect(() => {
    if (userData != null) {
    setuser(userData);
  }

 }, [userData]);

 const handleLogout = async () => {
 
  try {
    const response = await api.get("/auth/signout", {withCredentials:true});
    navigate("/login");
    setUserData(null);
    toast.success(response?.data?.message)
    console.log(response.data)
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message)
    console.log(error?.response?.data?.message || error?.message)
  }
 }
 
  return (
    <div className="bg-blue-400 sticky top-0 h-[100px] w-full flex items-center shadow-2xl z-100 ">

      {/* Logo */}
      <div className="w-[30%] flex items-center px-[15px]">
        <div className="rounded-full h-[80px] w-[80px]">
          <Link to="/">
            <img src={Logo} alt="logo" className="object-cover rounded-full h-full w-full" />
          </Link>
        </div>
      </div>

      {/* Menu */}
      <div className="w-[40%]">
        <ul className="flex justify-center items-center gap-[15px]">
          <li className="bg-black px-3 py-2 rounded-2xl">
            <Link to="/" className="text-white">Home</Link>
          </li>

          <li className="bg-black px-3 py-2 rounded-2xl">
            <Link to="/about" className="text-white">About</Link>
          </li>

          <li className="bg-black px-3 py-2 rounded-2xl">
            <Link to="/my-bookings" className="text-white">Bookings</Link>
          </li>

          <li className="bg-black px-3 py-2 rounded-2xl">
            <Link to="/packages" className="text-white">Packages</Link>
          </li>

          <li className="bg-black px-3 py-2 rounded-2xl">
            <Link to="/contacts" className="text-white">Contacts</Link>
          </li>
        </ul>
      </div>

      {/* Account */}
      <div className="w-[30%] flex justify-end pr-[20px] rounded-full relative">

        {user ? (

          <>
            <button
              onClick={() => setOpenAccountSetting(!openAccountSetting)}
              className=" p-3 rounded-full text-white"
            >
              { <> { userData && userData.userImg ? <img src={userData.userImg} className="rounded-full shadow-xl w-[70px] h-[70px] object-cover " alt="" />  
              :
               <div className="rounded-full bg-black text-white px-[14px] py-[8px]">{userData?.name.slice(0,1)}</div>  } </>} 
            </button>

            {openAccountSetting && (
              <div className="absolute top-[55px] right-[20px] bg-white text-black w-[200px] rounded-lg shadow-lg p-3 z-50">
                <Link to={"/profile"} className="w-full text-left hover:bg-gray-200 p-2 rounded">
                  Profile
                </Link>

                <button className="w-full text-left hover:bg-gray-200 p-2 rounded">
                  My Bookings
                </button>

                <button onClick={handleLogout} className="w-full text-left hover:bg-red-200 p-2 rounded text-red-600">
                  Logout
                </button>
              </div>
            )}
          </>

        ) : (

          <div className="flex gap-3">

            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded-full"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded-full border"
            >
              Register
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};

export default Nav;
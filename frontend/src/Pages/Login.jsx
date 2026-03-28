import React, { useState, useContext } from 'react'
import { FaEye, } from "react-icons/fa6";
import api from '../Api/Api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContext';
const Login = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [form, setform] = useState({
        email: "",
        password: ""

    });
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
       
        
  e.preventDefault();

  try {
    const response = await api.post("/auth/signin", form);

    const userRole = response?.data?.user?.role;
    console.log(userRole);

    setUserData(response?.data?.user);

    toast.success(response?.data?.message);

    if (userRole === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.log(error?.response?.data?.message || error?.message);
  }
};
    

    return (
        <>
            <div className="h-screen flex bg-gradient-to-l from-green-400 to-blue-600 justify-center items-center">
                <div className="border-2 w-[320px] px-[15px] py-[12px] border-white rounded-2xl">
                    <h2 className='text-[25px] text-yellow-500 font-bold p-2'> Login</h2>
                    <hr className='bg-white w-full mb-2' />
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-[10px]">

                        <input type="email" className='w-full p-2 border-2 text-gray-700 
            placeholder-gray-700  font-semibold rounded-full
           outline-0  text-[15px] placeholder-gray-400'
                            placeholder='Enter Your Email'
                            value={form.email}
                            onChange={(e) => setform({ ...form, email: e.target.value })}
                        />
                        <div className="relative w-full border-2 rounded-full  ">
                            <input type={!showPassword ? "password" : "text"} className='w-full rounded-full border-none p-2 bg-transparent font-semibold
             text-gray-700  
            placeholder-gray-700
           outline-0  text-[15px] placeholder-gray-400'
                                placeholder='Enter Your Password'
                                value={form.password}
                                onChange={(e) => setform({ ...form, password: e.target.value })}
                            />
                            <div onClick={() => setshowPassword(!showPassword)} className="absolute top-2 right-4">
                                {

                                    <FaEye className='text-[18px] cursor-pointer' />
                                }
                            </div>

                        </div>


                        <p className='text-left text-sm text-white font-semibold'>Don't have an Account? <Link to={`/signup`} className='text-blue-800 cursor-pointer font-semibold' >SignUp</Link></p>
                        <div className="flex justify-center items-center">
                            <button className='bg-gradient-to-l px-[15px] py-[8px] rounded-2xl cursor-pointer hover:bg-gray-600
                             from-black to-[#252525] text-white'>SignIn</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
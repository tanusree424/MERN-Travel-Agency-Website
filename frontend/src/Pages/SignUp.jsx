import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api/Api';
const SignUp = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [form, setform] = useState({
        name:"",
        email: "",
        password: ""

    });
    const navigate = useNavigate();
     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/signup", form);
            console.log(response.data)
            navigate("/login");
            toast.success(response?.data?.message)

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message)
        }
    }
    return (
        <>
            <div className="h-screen flex bg-gradient-to-l from-green-400 to-blue-600 justify-center items-center">
                <div className="border-2 w-[400px] px-[15px] py-[12px] border-white rounded-2xl">
                    <h2 className='text-[25px] text-yellow-500 font-bold p-2'> SignUp</h2>
                    <hr className='bg-white w-full mb-2' />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
                        <input type="text" className='w-full p-2 border-2 rounded-full
           outline-0  text-[15px] text-gray-700 placeholder-gray-700 font-semibold'
                            placeholder='Enter Your Name'
                            value={form.name}
                            onChange={(e)=>setform({...form , name:e.target.value})}
                            />
                        <input type="email" className='w-full p-2 border-2 text-gray-700 rounded-full
            placeholder-gray-700  font-semibold
           outline-0  text-[15px] placeholder-gray-400'
                            placeholder='Enter Your Email'
                            value={form.email}
                           onChange={(e)=>setform({...form , email:e.target.value})}
                            />
                        <div className="relative w-full border-2 rounded-full  ">
                            <input type={!showPassword ? "password" : "text"}
                             className='w-full rounded-full border-none p-2 bg-transparent 
                             font-semibold
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
                        <p className='text-left text-sm text-white font-semibold'>
                            Already have an Account? <Link to={`/login`} className='text-blue-800 cursor-pointer font-semibold' >Login</Link></p>
                        <div className="flex justify-center items-center">
                            <button className='bg-gradient-to-l px-[15px] py-[8px] rounded-2xl cursor-pointer hover:bg-gray-600
                             from-black to-[#252525] text-white'>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
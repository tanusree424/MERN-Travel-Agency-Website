import React from 'react'
import { FaUsers, FaMapMarkedAlt, FaSmile } from 'react-icons/fa'
import Nav from '../Component/Nav'
import Footer from '../Component/Footer'

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

    <Nav/>

      {/*  ABOUT CONTENT */}
      <div className="max-w-6xl mx-auto py-12 px-5 grid md:grid-cols-2 gap-10 items-center">

        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" 
          alt=""
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-3">
            We are a passionate travel agency dedicated to providing unforgettable travel experiences. 
            Our mission is to help you explore the world with comfort and confidence.
          </p>

          <p className="text-gray-600">
            From exotic beaches to adventurous mountains, we offer customized travel packages 
            that suit your needs and budget.
          </p>
        </div>

      </div>

      {/*  STATS */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          <div className="p-6">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold">5000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="p-6">
            <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold">100+</h3>
            <p className="text-gray-600">Destinations</p>
          </div>

          <div className="p-6">
            <FaSmile className="text-4xl text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold">10+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>

        </div>
      </div>

      {/*  TEAM */}
      <div className="py-12 px-5 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

          {/* Member 1 */}
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-3"
              alt=""
            />
            <h3 className="font-bold">Tanusree</h3>
            <p className="text-gray-500 text-sm">Travel Expert</p>
          </div>

          {/* Member 2 */}
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-3"
              alt=""
            />
            <h3 className="font-bold">Rahul</h3>
            <p className="text-gray-500 text-sm">Tour Manager</p>
          </div>

          {/* Member 3 */}
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <img 
              src="https://randomuser.me/api/portraits/women/68.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-3"
              alt=""
            />
            <h3 className="font-bold">Priya</h3>
            <p className="text-gray-500 text-sm">Support Lead</p>
          </div>

        </div>

      </div>
<Footer/>
    </div>
  )
}

export default About
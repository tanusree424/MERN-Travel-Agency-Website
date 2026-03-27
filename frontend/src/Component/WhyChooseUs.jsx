import React from 'react'
import { FaPlane, FaHeadset, FaMoneyBillWave, FaStar } from 'react-icons/fa'

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-16 px-5">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Us ✨
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-15">

        {/* Card 1 */}
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300">
          <div className="text-blue-600 text-4xl mb-4 flex justify-center">
            <FaPlane />
          </div>
          <h3 className="font-bold text-lg">Best Destinations</h3>
          <p className="text-gray-600 text-sm mt-2">
            Explore top destinations around the world with us.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300">
          <div className="text-green-600 text-4xl mb-4 flex justify-center">
            <FaMoneyBillWave />
          </div>
          <h3 className="font-bold text-lg">Affordable Price</h3>
          <p className="text-gray-600 text-sm mt-2">
            Get the best deals and budget-friendly packages.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300">
          <div className="text-red-500 text-4xl mb-4 flex justify-center">
            <FaHeadset />
          </div>
          <h3 className="font-bold text-lg">24/7 Support</h3>
          <p className="text-gray-600 text-sm mt-2">
            Our team is always ready to assist you anytime.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300">
          <div className="text-yellow-500 text-4xl mb-4 flex justify-center">
            <FaStar />
          </div>
          <h3 className="font-bold text-lg">Trusted Service</h3>
          <p className="text-gray-600 text-sm mt-2">
            Thousands of happy customers trust our services.
          </p>
        </div>

      </div>

    </div>
  )
}

export default WhyChooseUs
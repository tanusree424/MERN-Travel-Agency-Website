import React , {useState, useEffect} from 'react'
import Nav from '../Component/Nav'
import Hero from '../Component/Hero'
import Package from '../Component/Package'
import WhyChooseUs from '../Component/WhyChooseUs'
import Testimonials from '../Component/Testimonial'
import CallToAction from '../Component/CallToAction'
import FAQSection from '../Component/FAQSection'
import ContactSection from '../Component/ContactSection'
import BlogSection from '../Component/BlogSection'
import Footer from '../Component/Footer'
import api from '../Api/Api'
import ReviewModal from '../Component/ReviewModal'



const Home = () => {
  const [reviewData, setReviewData] = useState(null);
  const [showModal, setShowModal] = useState(false);
   const checkReview = async () => {
      try {

        const res = await api.get("/bookings/review-pending", {
          withCredentials: true
        });

        if (res.data) {
          setReviewData(res.data);
          setShowModal(true); // 🔥 auto popup
        }

      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
     checkReview()
    }, [])
    
  return (
    <>
    <Nav/>
    <Hero/>
    <Package/>
    <WhyChooseUs/>
    <Testimonials/>
    <CallToAction/>
    <FAQSection/>
    <ContactSection/>
    <BlogSection/>
    <Footer/>
    {showModal && (
        <ReviewModal
          data={reviewData}
          onClose={() => setShowModal(false)}
        />
      )}
    
 
    </>
  )
}

export default Home
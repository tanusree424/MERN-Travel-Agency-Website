import React from 'react'
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



const Home = () => {
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
 
    </>
  )
}

export default Home
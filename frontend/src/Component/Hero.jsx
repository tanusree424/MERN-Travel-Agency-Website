import React from 'react'
import Travel1 from "../assets/TRAVELBANNER-1.png"
import Travel2 from "../assets/TRAVELBANNER-1.png2.png"
import TRavel3 from "../assets/TRAVEL-BANNER-3.png"


const Hero = () => {
  return (
    <>
      <div id="carouselExampleControls" className="carousel slide position-relative" data-bs-ride="carousel">

        <div className="carousel-inner">

          <div className="carousel-item active position-relative">
            <img src={Travel1} className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="" />
          </div>

          <div className="carousel-item position-relative">
            <img src={Travel2} className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="" />
          </div>

          <div className="carousel-item position-relative">
            <img src={TRavel3} className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="" />
          </div>

        </div>

        {/*  DARK OVERLAY */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(0,0,0,0.5)" }}></div>

        {/*  TEXT CONTENT */}
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">

          <h1 className="fw-bold display-4 mb-3" style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }}>
            Explore The World 🌍
          </h1>

          <p className="mb-4" style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}>
            Discover amazing places with us
          </p>

          <button className="btn btn-danger px-4 py-2">
            Explore Destinations
          </button>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
    </>
  )
}

export default Hero
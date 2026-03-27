import React from 'react';

const CallToAction = () => {
  return (
    <section
      className="cta-section text-white py-5 d-flex align-items-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px",
      }}
    >
      <div className="container text-center">
        <h2 className="mb-3" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}>
          Ready for Your Next Adventure?
        </h2>
        <p className="mb-4" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
          Book your dream travel package today and make unforgettable memories!
        </p>
        <a href="/packages" className="btn btn-primary btn-lg">
          Explore Packages
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
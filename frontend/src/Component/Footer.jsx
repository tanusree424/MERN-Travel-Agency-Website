import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About / Logo */}
          <div className="col-md-4 mb-4">
            <h4 className="mb-3">Travel Agency</h4>
            <p>
              Explore the world with us. Book your dream travel packages and make unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/packages" className="text-white text-decoration-none">Packages</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info / Social */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: info@travelagency.com</p>
            <p>Phone: +91 123 456 7890</p>
            <div className="mt-2">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          &copy; {new Date().getFullYear()} Travel Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
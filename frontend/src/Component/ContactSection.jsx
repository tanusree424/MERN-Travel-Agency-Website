import React, { useState } from "react";

import api from "../Api/Api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    messages: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend API call (optional)
      const response= await api.post("/contact/create", formData);


      setSuccess("Your message has been sent!");
      setFormData({ name: "", email: "", subject: "", messages: "" });
    } catch (err) {
      console.log(err.response?.data?.message || err?.message);
    }
  };

  return (
    <section className="contact-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center mb-5">Have questions or want to book directly? Reach out!</p>

        <div className="row justify-content-center">
          <div className="col-md-8">
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="messages"
                  className="form-control"
                  rows="5"
                  value={formData.messages}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
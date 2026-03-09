import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">We'd love to hear from you</p>
          
          <form className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group full-width">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group full-width">
                <textarea
                  className="form-textarea"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div className="form-group full-width">
                <button className="submit-btn" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
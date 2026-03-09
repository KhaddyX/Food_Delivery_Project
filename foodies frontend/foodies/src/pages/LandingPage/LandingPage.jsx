import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <main className="landing-page">
      {/* Hero Section */}
      <section className="container py-5 landing-hero">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="text-uppercase landing-eyebrow mb-3">Welcome to Foodies</p>
            <h1 className="display-4 fw-bold mb-3">
              Your next favorite meal is just a few clicks away.
            </h1>
            <p className="lead text-muted mb-4">
              Discover curated menus, track deliveries, and reorder your
              favorites with ease. Everything you love, all in one place.
            </p>
            <div className="d-flex flex-wrap gap-3">
              {/* Primary CTA */}
              <Link to="/register" className="btn btn-primary btn-lg landing-btn">
                Get Started
              </Link>
              {/* Secondary CTA */}
              <Link to="/login" className="btn btn-outline-dark btn-lg landing-btn">
                Continue Where You Left Off
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            {/* Simple hero visual */}
            <div className="landing-hero-card">
              <div className="landing-hero-badge">Fast Delivery</div>
              <div className="landing-hero-circle"></div>
              <div className="landing-hero-circle landing-hero-circle-secondary"></div>
              <div className="landing-hero-circle landing-hero-circle-tertiary"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landing-footer py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Foodies. All rights reserved.
          </small>
          <div className="d-flex gap-3">
            <Link to="/about" className="footer-link">
              About
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;

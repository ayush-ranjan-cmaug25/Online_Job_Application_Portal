import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass mt-5" style={{ 
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '40px 0 20px'
    }}>
      <div className="container-smash">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">JobPortal</h5>
            <p className="mb-3" style={{ opacity: 0.8 }}>
              Your trusted platform for finding the perfect job opportunities and connecting talented candidates with top employers.
            </p>
            <div className="mb-2">
              <strong>Contact Us:</strong>
            </div>
            <div className="mb-1" style={{ opacity: 0.8 }}>
              📧 Email: <a href="mailto:info@jobportal.com" className="text-decoration-none">info@jobportal.com</a>
            </div>
            <div className="mb-1" style={{ opacity: 0.8 }}>
              📞 Phone: <a href="tel:+911234567890" className="text-decoration-none">+91 123 456 7890</a>
            </div>
            <div style={{ opacity: 0.8 }}>
              📍 Address: 123 Business Park, Mumbai, India
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/jobs" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Find Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">For Candidates</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/jobs" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Browse Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  My Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  My Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">For Employers</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/post-job" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Post a Job
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/employer/dashboard" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Employer Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/manage-jobs" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Manage Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none" style={{ opacity: 0.8 }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ opacity: 0.2 }} />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0" style={{ opacity: 0.7 }}>
              &copy; {currentYear} JobPortal. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy-policy" className="text-decoration-none me-3" style={{ opacity: 0.7 }}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-decoration-none" style={{ opacity: 0.7 }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

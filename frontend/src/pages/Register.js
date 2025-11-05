import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker',
    phone: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Phone validation (if provided)
    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    // Company name validation for employers
    if (formData.role === 'employer' && !formData.companyName.trim()) {
      setError('Company name is required for employers');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-smash my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="glass p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted">Join our job portal today</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">I am a</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="seeker"
                      value="seeker"
                      checked={formData.role === 'seeker'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="seeker">
                      Candidate
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="employer"
                      value="employer"
                      checked={formData.role === 'employer'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="employer">
                      Employer
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-glass"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-glass"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Password *</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-glass"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control form-glass"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control form-glass"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              {formData.role === 'employer' && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control form-glass"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none fw-bold" style={{color: '#4078FF'}}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

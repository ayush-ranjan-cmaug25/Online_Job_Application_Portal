import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function PostJob() {
  const { user, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    company: user?.companyName || '',
    location: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'Full-time',
    industry: '',
    experienceLevel: 'Mid Level',
    deadline: '',
    isFeatured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }

    if (!formData.company.trim()) {
      setError('Company name is required');
      return;
    }

    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }

    if (!formData.description.trim() || formData.description.length < 50) {
      setError('Please provide a detailed job description (at least 50 characters)');
      return;
    }

    // Salary validation
    if (formData.salaryMin && formData.salaryMax) {
      const min = parseInt(formData.salaryMin);
      const max = parseInt(formData.salaryMax);
      if (min > max) {
        setError('Minimum salary cannot be greater than maximum salary');
        return;
      }
    }

    // Deadline validation
    if (formData.deadline) {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setError('Deadline cannot be in the past');
        return;
      }
    }

    setLoading(true);

    try {
      await jobAPI.create({
        ...formData,
        createdBy: user.id,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null
      });
      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !isEmployer) {
    return (
      <div className="container-smash my-5">
        <div className="glass p-5 text-center">
          <h3>Access Denied</h3>
          <p>Only employers can post jobs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-smash my-4">
      <h2 className="fw-bold mb-4">Post a New Job</h2>

      <div className="glass p-4">
        {error && (
          <div className="alert alert-danger mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <h5 className="fw-bold mb-3">Job Details</h5>

              <div className="mb-3">
                <label className="form-label fw-bold">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control form-glass"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  className="form-control form-glass"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Location *</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control form-glass"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Bangalore, Karnataka"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    className="form-control form-glass"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g., Information Technology"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Job Description *</label>
                <textarea
                  name="description"
                  className="form-control form-glass"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Requirements</label>
                <textarea
                  name="requirements"
                  className="form-control form-glass"
                  rows="4"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List the qualifications and skills required (one per line)"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  className="form-control form-glass"
                  rows="4"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="List key responsibilities (one per line)"
                />
              </div>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Additional Info</h5>

              <div className="mb-3">
                <label className="form-label fw-bold">Job Type *</label>
                <select
                  name="jobType"
                  className="form-select form-glass"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Experience Level *</label>
                <select
                  name="experienceLevel"
                  className="form-select form-glass"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  className="form-control form-glass mb-2"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g., ₹8-12 LPA"
                />
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      name="salaryMin"
                      className="form-control form-glass"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      placeholder="Min (₹)"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      name="salaryMax"
                      className="form-control form-glass"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      placeholder="Max (₹)"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control form-glass"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    className="form-check-input"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="featured">
                    Mark as Featured Job
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>

              <button
                type="button"
                className="btn btn-glass w-100"
                onClick={() => navigate('/employer/dashboard')}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;

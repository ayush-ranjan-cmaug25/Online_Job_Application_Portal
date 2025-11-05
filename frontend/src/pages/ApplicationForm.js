import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function ApplicationForm() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    education: user?.education || '',
    experience: user?.experience || '',
    skills: user?.skills || '',
    resumeUrl: user?.resumeUrl || '',
    coverLetter: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJob();
  }, [jobId, user]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getById(jobId);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    // Resume URL validation (if provided)
    if (formData.resumeUrl) {
      try {
        new URL(formData.resumeUrl);
      } catch {
        setError('Please enter a valid URL for resume');
        return;
      }
    }

    setLoading(true);

    try {
      await applicationAPI.submit({
        ...formData,
        jobId: parseInt(jobId),
        applicantId: user.id
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="container-smash my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container-smash my-5">
        <div className="glass p-5 text-center">
          <div style={{fontSize: '4rem'}} className="mb-3">🎉</div>
          <h2 className="fw-bold mb-3">Application Submitted!</h2>
          <p className="mb-4">Your application has been successfully submitted. The employer will review it soon.</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-smash my-4">
      <h2 className="fw-bold mb-4">Apply for {job.title}</h2>

      <div className="row">
        <div className="col-lg-8">
          <div className="glass p-4">
            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h4 className="fw-bold mb-3">Personal Information</h4>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control form-glass"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-glass"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control form-glass"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <hr className="my-4" style={{opacity: 0.2}} />

              <h4 className="fw-bold mb-3">Professional Details</h4>

              <div className="mb-3">
                <label className="form-label fw-bold">Education</label>
                <textarea
                  name="education"
                  className="form-control form-glass"
                  rows="3"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Your educational qualifications"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Work Experience</label>
                <textarea
                  name="experience"
                  className="form-control form-glass"
                  rows="4"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Your work experience"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Skills</label>
                <textarea
                  name="skills"
                  className="form-control form-glass"
                  rows="2"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Your relevant skills"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Resume URL</label>
                <input
                  type="url"
                  name="resumeUrl"
                  className="form-control form-glass"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/resume.pdf"
                />
                <small className="text-muted">Upload your resume to a cloud storage and paste the link here</small>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  className="form-control form-glass"
                  rows="6"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px 40px',
                  borderRadius: '12px'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass p-4" style={{position: 'sticky', top: '100px'}}>
            <h5 className="fw-bold mb-3">Job Summary</h5>
            <h6 className="fw-bold">{job.title}</h6>
            <p className="mb-2">{job.company}</p>
            <div className="mb-3">
              <span className="badge bg-light text-dark me-1">📍 {job.location}</span>
              <span className="badge bg-light text-dark">💼 {job.jobType}</span>
            </div>
            <div className="mb-2">
              <strong className="d-block mb-1">Salary</strong>
              <span>{job.salary}</span>
            </div>
            {job.deadline && (
              <div>
                <strong className="d-block mb-1">Deadline</strong>
                <span>{new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;

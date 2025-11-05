import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    skills: '',
    education: '',
    experience: '',
    resumeUrl: '',
    companyName: '',
    companyWebsite: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
      skills: user.skills || '',
      education: user.education || '',
      experience: user.experience || '',
      resumeUrl: user.resumeUrl || '',
      companyName: user.companyName || '',
      companyWebsite: user.companyWebsite || ''
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await authAPI.updateProfile(user.id, formData);
      updateUser(response.data.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container-smash my-4">
      <h2 className="fw-bold mb-4">My Profile</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="glass p-4 text-center">
            <div style={{fontSize: '5rem'}} className="mb-3">👤</div>
            <h5 className="fw-bold mb-1">{user.name}</h5>
            <p className="mb-2">{user.email}</p>
            <span className="badge bg-primary">{user.role}</span>
          </div>
        </div>

        <div className="col-md-8">
          <div className="glass p-4">
            {success && (
              <div className="alert alert-success mb-4">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h5 className="fw-bold mb-3">Basic Information</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-glass"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-glass"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {user.role === 'seeker' && (
                <>
                  <hr className="my-4" style={{opacity: 0.2}} />
                  <h5 className="fw-bold mb-3">Professional Details</h5>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Bio</label>
                    <textarea
                      name="bio"
                      className="form-control form-glass"
                      rows="3"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
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
                      placeholder="e.g., JavaScript, React, Node.js, Python"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Education</label>
                    <textarea
                      name="education"
                      className="form-control form-glass"
                      rows="3"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Your educational background..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Experience</label>
                    <textarea
                      name="experience"
                      className="form-control form-glass"
                      rows="4"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Your work experience..."
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
                    <small className="text-muted">Upload your resume to a cloud storage and paste the link</small>
                  </div>
                </>
              )}

              {user.role === 'employer' && (
                <>
                  <hr className="my-4" style={{opacity: 0.2}} />
                  <h5 className="fw-bold mb-3">Company Information</h5>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control form-glass"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Company Website</label>
                    <input
                      type="url"
                      name="companyWebsite"
                      className="form-control form-glass"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </>
              )}

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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

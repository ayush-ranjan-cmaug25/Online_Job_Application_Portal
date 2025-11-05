import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationAPI, savedJobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function ApplicantDashboard() {
  const { user, isSeeker } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    if (!user || !isSeeker) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, isSeeker]);

  const fetchData = async () => {
    try {
      const [appsRes, savedRes] = await Promise.all([
        applicationAPI.getByUser(user.id),
        savedJobAPI.getByUser(user.id)
      ]);
      setApplications(appsRes.data);
      setSavedJobs(savedRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Pending': 'bg-warning text-dark',
      'Under Review': 'bg-info text-white',
      'Shortlisted': 'bg-success',
      'Interview Scheduled': 'bg-primary',
      'Rejected': 'bg-danger',
      'Hired': 'bg-success'
    };
    return classes[status] || 'bg-secondary';
  };

  const handleRemoveSavedJob = async (savedJobId) => {
    try {
      await savedJobAPI.remove(savedJobId);
      setSavedJobs(savedJobs.filter(sj => sj.id !== savedJobId));
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  if (loading) {
    return (
      <div className="container-smash my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-smash my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Welcome back, {user.name}!</h2>
          <p className="text-muted mb-0">Track your job applications and saved jobs</p>
        </div>
        <Link to="/profile">
          <button className="btn btn-glass">Edit Profile</button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">📝</div>
              <div>
                <h3 className="fw-bold mb-0">{applications.length}</h3>
                <p className="mb-0">Total Applications</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">💙</div>
              <div>
                <h3 className="fw-bold mb-0">{savedJobs.length}</h3>
                <p className="mb-0">Saved Jobs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">✅</div>
              <div>
                <h3 className="fw-bold mb-0">
                  {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length}
                </h3>
                <p className="mb-0">Active Processes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            My Applications
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Jobs
          </button>
        </li>
      </ul>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div>
          {applications.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">📭</div>
              <h4 className="fw-bold mb-2">No applications yet</h4>
              <p className="text-muted mb-3">Start applying to jobs to see them here</p>
              <Link to="/jobs">
                <button className="btn btn-primary">Browse Jobs</button>
              </Link>
            </div>
          ) : (
            <div className="row g-3">
              {applications.map((app) => (
                <div key={app.id} className="col-12">
                  <div className="glass p-4">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="fw-bold mb-1">{app.job?.title}</h5>
                            <p className="mb-0" style={{opacity: 0.7}}>{app.job?.company}</p>
                          </div>
                          <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-light text-dark me-2">📍 {app.job?.location}</span>
                          <span className="badge bg-light text-dark">💼 {app.job?.jobType}</span>
                        </div>
                        <small className="text-muted">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <div className="fw-bold mb-2" style={{color: '#4078FF'}}>
                          {app.job?.salary}
                        </div>
                        <Link to={`/jobs/${app.job?.id}`}>
                          <button className="btn btn-sm btn-glass">View Job</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Jobs Tab */}
      {activeTab === 'saved' && (
        <div>
          {savedJobs.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">💙</div>
              <h4 className="fw-bold mb-2">No saved jobs</h4>
              <p className="text-muted mb-3">Save jobs you're interested in to view them later</p>
              <Link to="/jobs">
                <button className="btn btn-primary">Browse Jobs</button>
              </Link>
            </div>
          ) : (
            <div className="row g-3">
              {savedJobs.map((savedJob) => (
                <div key={savedJob.id} className="col-12">
                  <div className="glass p-4">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="fw-bold mb-1">{savedJob.job?.title}</h5>
                            <p className="mb-0" style={{opacity: 0.7}}>{savedJob.job?.company}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-light text-dark me-2">📍 {savedJob.job?.location}</span>
                          <span className="badge bg-light text-dark">💼 {savedJob.job?.jobType}</span>
                        </div>
                        <small className="text-muted">
                          Saved on {new Date(savedJob.savedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="col-md-3 text-md-end">
                        <div className="fw-bold mb-2" style={{color: '#4078FF'}}>
                          {savedJob.job?.salary}
                        </div>
                        <div className="d-flex gap-2 justify-content-md-end">
                          <Link to={`/jobs/${savedJob.job?.id}`}>
                            <button className="btn btn-sm btn-glass">View</button>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveSavedJob(savedJob.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ApplicantDashboard;

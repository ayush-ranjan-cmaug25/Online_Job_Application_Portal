import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function EmployerDashboard() {
  const { user, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pending: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isEmployer) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, isEmployer]);

  const fetchDashboardData = async () => {
    try {
      const [jobsRes, statsRes] = await Promise.all([
        jobAPI.getByEmployer(user.id),
        applicationAPI.getStats(user.id)
      ]);

      const jobs = jobsRes.data;
      setRecentJobs(jobs.slice(0, 5));
      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.isActive).length,
        ...statsRes.data
      });

      // Get recent applications for employer's jobs
      if (jobs.length > 0) {
        const appsRes = await applicationAPI.getByJob(jobs[0].id);
        setRecentApplications(appsRes.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
          <h2 className="fw-bold mb-1">Employer Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user.name}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/post-job">
            <button className="btn btn-primary" style={{
              background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
              border: 'none',
              borderRadius: '10px'
            }}>
              Post New Job
            </button>
          </Link>
          <Link to="/profile">
            <button className="btn btn-glass">Profile</button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">💼</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.totalJobs}</h3>
                <p className="mb-0 small">Total Jobs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">✅</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.activeJobs}</h3>
                <p className="mb-0 small">Active Jobs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">📝</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.totalApplications}</h3>
                <p className="mb-0 small">Total Applications</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">⏳</div>
              <div>
                <h3 className="fw-bold mb-0">{stats.pending}</h3>
                <p className="mb-0 small">Pending Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <Link to="/post-job" className="text-decoration-none">
            <div className="glass p-4 text-center job-card">
              <div style={{fontSize: '3rem'}} className="mb-2">➕</div>
              <h5 className="fw-bold">Post New Job</h5>
              <p className="mb-0 small" style={{opacity: 0.7}}>Create a new job listing</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/manage-jobs" className="text-decoration-none">
            <div className="glass p-4 text-center job-card">
              <div style={{fontSize: '3rem'}} className="mb-2">⚙️</div>
              <h5 className="fw-bold">Manage Jobs</h5>
              <p className="mb-0 small" style={{opacity: 0.7}}>Edit or deactivate jobs</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <div className="glass p-4 text-center">
            <div style={{fontSize: '3rem'}} className="mb-2">📊</div>
            <h5 className="fw-bold">View Analytics</h5>
            <p className="mb-0 small" style={{opacity: 0.7}}>Track job performance</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Jobs */}
        <div className="col-md-6 mb-4">
          <div className="glass p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Job Postings</h5>
              <Link to="/manage-jobs" className="text-decoration-none small">View All →</Link>
            </div>
            {recentJobs.length === 0 ? (
              <p className="text-center text-muted py-4">No jobs posted yet</p>
            ) : (
              <div>
                {recentJobs.map((job) => (
                  <div key={job.id} className="mb-3 pb-3 border-bottom" style={{borderColor: 'rgba(0,0,0,0.1)'}}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">{job.title}</h6>
                        <small className="text-muted">{job.location} • {job.jobType}</small>
                      </div>
                      <span className={`badge ${job.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Link to={`/applications/${job.id}`}>
                        <button className="btn btn-sm btn-glass me-2">View Applications</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Application Stats */}
        <div className="col-md-6 mb-4">
          <div className="glass p-4">
            <h5 className="fw-bold mb-3">Application Status Breakdown</h5>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Pending</span>
                <strong>{stats.pending}</strong>
              </div>
              <div className="progress" style={{height: '8px'}}>
                <div
                  className="progress-bar bg-warning"
                  style={{width: `${stats.totalApplications ? (stats.pending / stats.totalApplications) * 100 : 0}%`}}
                ></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Under Review</span>
                <strong>{stats.underReview}</strong>
              </div>
              <div className="progress" style={{height: '8px'}}>
                <div
                  className="progress-bar bg-info"
                  style={{width: `${stats.totalApplications ? (stats.underReview / stats.totalApplications) * 100 : 0}%`}}
                ></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Shortlisted</span>
                <strong>{stats.shortlisted}</strong>
              </div>
              <div className="progress" style={{height: '8px'}}>
                <div
                  className="progress-bar bg-success"
                  style={{width: `${stats.totalApplications ? (stats.shortlisted / stats.totalApplications) * 100 : 0}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-2">
                <span>Interview Scheduled</span>
                <strong>{stats.interviewed}</strong>
              </div>
              <div className="progress" style={{height: '8px'}}>
                <div
                  className="progress-bar bg-primary"
                  style={{width: `${stats.totalApplications ? (stats.interviewed / stats.totalApplications) * 100 : 0}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;

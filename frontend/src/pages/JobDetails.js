import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobAPI, savedJobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function JobDetails() {
  const { id } = useParams();
  const { user, isSeeker } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savedJobId, setSavedJobId] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    if (user && isSeeker) {
      checkIfSaved();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobAPI.getById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const response = await savedJobAPI.checkSaved(user.id, id);
      setIsSaved(response.data.isSaved);
      setSavedJobId(response.data.savedJobId);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isSaved) {
        await savedJobAPI.remove(savedJobId);
        setIsSaved(false);
      } else {
        const response = await savedJobAPI.save({ userId: user.id, jobId: id });
        setIsSaved(true);
        setSavedJobId(response.data.savedJob.id);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/apply/${id}`);
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

  if (!job) {
    return (
      <div className="container-smash my-5">
        <div className="glass p-5 text-center">
          <h3>Job not found</h3>
          <Link to="/jobs" className="btn btn-primary mt-3">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-smash my-4">
      <Link to="/jobs" className="text-decoration-none mb-3 d-inline-block">
        ← Back to Jobs
      </Link>

      <div className="row">
        <div className="col-lg-8">
          <div className="glass p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="fw-bold mb-2">{job.title}</h2>
                <h5 className="mb-0" style={{opacity: 0.8}}>{job.company}</h5>
              </div>
              {job.isFeatured && (
                <span className="badge bg-primary">Featured</span>
              )}
            </div>

            <div className="mb-4">
              <span className="badge bg-light text-dark me-2 mb-2">📍 {job.location}</span>
              <span className="badge bg-light text-dark me-2 mb-2">💼 {job.jobType}</span>
              <span className="badge bg-light text-dark me-2 mb-2">📊 {job.experienceLevel}</span>
              {job.industry && (
                <span className="badge bg-light text-dark mb-2">🏢 {job.industry}</span>
              )}
            </div>

            <div className="mb-4">
              <h4 className="fw-bold mb-3">Job Description</h4>
              <p style={{whiteSpace: 'pre-line', lineHeight: '1.8'}}>{job.description}</p>
            </div>

            {job.requirements && (
              <div className="mb-4">
                <h4 className="fw-bold mb-3">Requirements</h4>
                <p style={{whiteSpace: 'pre-line', lineHeight: '1.8'}}>{job.requirements}</p>
              </div>
            )}

            {job.responsibilities && (
              <div className="mb-4">
                <h4 className="fw-bold mb-3">Responsibilities</h4>
                <p style={{whiteSpace: 'pre-line', lineHeight: '1.8'}}>{job.responsibilities}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass p-4 mb-4" style={{position: 'sticky', top: '100px'}}>
            <h4 className="fw-bold mb-4">Job Overview</h4>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div style={{fontSize: '1.5rem'}} className="me-3">💰</div>
                <div>
                  <small className="d-block" style={{opacity: 0.7}}>Salary</small>
                  <strong>{job.salary}</strong>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div style={{fontSize: '1.5rem'}} className="me-3">📅</div>
                <div>
                  <small className="d-block" style={{opacity: 0.7}}>Posted</small>
                  <strong>{new Date(job.postedAt).toLocaleDateString()}</strong>
                </div>
              </div>
            </div>

            {job.deadline && (
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <div style={{fontSize: '1.5rem'}} className="me-3">⏰</div>
                  <div>
                    <small className="d-block" style={{opacity: 0.7}}>Application Deadline</small>
                    <strong>{new Date(job.deadline).toLocaleDateString()}</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <div style={{fontSize: '1.5rem'}} className="me-3">👁️</div>
                <div>
                  <small className="d-block" style={{opacity: 0.7}}>Views</small>
                  <strong>{job.views} views</strong>
                </div>
              </div>
            </div>

            <hr style={{opacity: 0.2}} />

            {isSeeker && (
              <>
                <button
                  onClick={handleApply}
                  className="btn btn-primary w-100 mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px'
                  }}
                >
                  Apply Now
                </button>
                <button
                  onClick={handleSaveJob}
                  className="btn btn-glass w-100"
                >
                  {isSaved ? '💙 Saved' : '🤍 Save Job'}
                </button>
              </>
            )}

            {!user && (
              <button
                onClick={handleApply}
                className="btn btn-primary w-100"
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                Apply Now
              </button>
            )}
          </div>

          {job.creator && (
            <div className="glass p-4">
              <h5 className="fw-bold mb-3">About Company</h5>
              <h6 className="fw-bold mb-1">{job.creator.companyName || job.company}</h6>
              {job.creator.companyWebsite && (
                <a 
                  href={job.creator.companyWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none small"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

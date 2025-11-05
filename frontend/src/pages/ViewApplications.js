import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { applicationAPI, jobAPI } from '../api';

function ViewApplications() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchData();
  }, [jobId]);

  useEffect(() => {
    if (statusFilter) {
      setFilteredApplications(applications.filter(app => app.status === statusFilter));
    } else {
      setFilteredApplications(applications);
    }
  }, [statusFilter, applications]);

  const fetchData = async () => {
    try {
      const [jobRes, appsRes] = await Promise.all([
        jobAPI.getById(jobId),
        applicationAPI.getByJob(jobId)
      ]);
      setJob(jobRes.data);
      setApplications(appsRes.data);
      setFilteredApplications(appsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationAPI.updateStatus(appId, newStatus);
      fetchData();
      if (selectedApp && selectedApp.id === appId) {
        const updatedApp = applications.find(a => a.id === appId);
        setSelectedApp({ ...updatedApp, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
      <Link to="/manage-jobs" className="text-decoration-none mb-3 d-inline-block">
        ← Back to Manage Jobs
      </Link>

      {job && (
        <div className="glass p-4 mb-4">
          <h3 className="fw-bold mb-1">{job.title}</h3>
          <p className="mb-0">{job.company} • {job.location}</p>
        </div>
      )}

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="glass p-4 mb-3">
            <h5 className="fw-bold mb-3">Filter by Status</h5>
            <div className="d-grid gap-2">
              <button
                className={`btn ${!statusFilter ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setStatusFilter('')}
              >
                All ({applications.length})
              </button>
              <button
                className={`btn ${statusFilter === 'Pending' ? 'btn-warning' : 'btn-glass'}`}
                onClick={() => setStatusFilter('Pending')}
              >
                Pending ({applications.filter(a => a.status === 'Pending').length})
              </button>
              <button
                className={`btn ${statusFilter === 'Under Review' ? 'btn-info' : 'btn-glass'}`}
                onClick={() => setStatusFilter('Under Review')}
              >
                Under Review ({applications.filter(a => a.status === 'Under Review').length})
              </button>
              <button
                className={`btn ${statusFilter === 'Shortlisted' ? 'btn-success' : 'btn-glass'}`}
                onClick={() => setStatusFilter('Shortlisted')}
              >
                Shortlisted ({applications.filter(a => a.status === 'Shortlisted').length})
              </button>
              <button
                className={`btn ${statusFilter === 'Interview Scheduled' ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setStatusFilter('Interview Scheduled')}
              >
                Interview Scheduled ({applications.filter(a => a.status === 'Interview Scheduled').length})
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {filteredApplications.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">📭</div>
              <h4 className="fw-bold mb-2">No applications yet</h4>
              <p className="text-muted">Applications will appear here once candidates apply</p>
            </div>
          ) : (
            <div className="glass p-4">
              <h5 className="fw-bold mb-3">Applications</h5>
              <div>
                {filteredApplications.map((app) => (
                  <div key={app.id} className="border-bottom pb-3 mb-3" style={{borderColor: 'rgba(0,0,0,0.1)'}}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold mb-1">{app.fullName}</h6>
                        <p className="mb-1 small">{app.email} • {app.phone}</p>
                        <small className="text-muted">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </div>

                    {app.skills && (
                      <p className="small mb-2"><strong>Skills:</strong> {app.skills}</p>
                    )}

                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-glass"
                        data-bs-toggle="modal"
                        data-bs-target="#appModal"
                        onClick={() => setSelectedApp(app)}
                      >
                        View Details
                      </button>
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-glass">
                          View Resume
                        </a>
                      )}
                      <select
                        className="form-select form-select-sm"
                        style={{width: 'auto'}}
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      <div className="modal fade" id="appModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content glass">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Application Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedApp && (
                <>
                  <div className="mb-3">
                    <h6 className="fw-bold">Applicant Information</h6>
                    <p className="mb-1"><strong>Name:</strong> {selectedApp.fullName}</p>
                    <p className="mb-1"><strong>Email:</strong> {selectedApp.email}</p>
                    <p className="mb-1"><strong>Phone:</strong> {selectedApp.phone}</p>
                    <p className="mb-0">
                      <strong>Status:</strong> 
                      <span className={`badge ${getStatusBadgeClass(selectedApp.status)} ms-2`}>
                        {selectedApp.status}
                      </span>
                    </p>
                  </div>

                  {selectedApp.education && (
                    <div className="mb-3">
                      <h6 className="fw-bold">Education</h6>
                      <p style={{whiteSpace: 'pre-line'}}>{selectedApp.education}</p>
                    </div>
                  )}

                  {selectedApp.experience && (
                    <div className="mb-3">
                      <h6 className="fw-bold">Experience</h6>
                      <p style={{whiteSpace: 'pre-line'}}>{selectedApp.experience}</p>
                    </div>
                  )}

                  {selectedApp.skills && (
                    <div className="mb-3">
                      <h6 className="fw-bold">Skills</h6>
                      <p>{selectedApp.skills}</p>
                    </div>
                  )}

                  {selectedApp.coverLetter && (
                    <div className="mb-3">
                      <h6 className="fw-bold">Cover Letter</h6>
                      <p style={{whiteSpace: 'pre-line'}}>{selectedApp.coverLetter}</p>
                    </div>
                  )}

                  {selectedApp.resumeUrl && (
                    <div>
                      <a 
                        href={selectedApp.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        View Resume →
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewApplications;

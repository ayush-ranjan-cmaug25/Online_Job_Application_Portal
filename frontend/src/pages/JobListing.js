import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jobAPI } from '../api';

function JobListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    jobType: searchParams.get('jobType') || '',
    industry: searchParams.get('industry') || '',
    experienceLevel: searchParams.get('experienceLevel') || ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams);
      const response = await jobAPI.getAll(params);
      setJobs(response.data.jobs);
      setPagination({
        currentPage: response.data.currentPage,
        pages: response.data.pages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const params = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      industry: '',
      experienceLevel: ''
    });
    setSearchParams({});
  };

  return (
    <div className="container-smash my-4">
      <h2 className="fw-bold mb-4">Find Jobs</h2>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="glass p-4">
            <h5 className="fw-bold mb-3">Filters</h5>
            <form onSubmit={applyFilters}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Keyword</label>
                <input
                  type="text"
                  name="search"
                  className="form-control form-glass"
                  placeholder="Job title, keywords..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control form-glass"
                  placeholder="City, State"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Job Type</label>
                <select
                  name="jobType"
                  className="form-select form-glass"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Experience Level</label>
                <select
                  name="experienceLevel"
                  className="form-select form-glass"
                  value={filters.experienceLevel}
                  onChange={handleFilterChange}
                >
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Industry</label>
                <input
                  type="text"
                  name="industry"
                  className="form-control form-glass"
                  placeholder="e.g., IT, Marketing"
                  value={filters.industry}
                  onChange={handleFilterChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2" style={{
                background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                border: 'none',
                borderRadius: '10px'
              }}>
                Apply Filters
              </button>
              <button type="button" onClick={clearFilters} className="btn btn-glass w-100">
                Clear All
              </button>
            </form>
          </div>
        </div>

        {/* Job Listings */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">
              <strong>{pagination.total}</strong> jobs found
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">😕</div>
              <h4 className="fw-bold mb-2">No jobs found</h4>
              <p className="text-muted">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <>
              <div className="row g-3">
                {jobs.map((job) => (
                  <div key={job.id} className="col-12">
                    <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                      <div className="glass job-card">
                        <div className="job-card-inner p-4">
                          <div className="row">
                            <div className="col-md-9">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h5 className="fw-bold mb-1">{job.title}</h5>
                                  <p className="mb-2" style={{opacity: 0.7}}>{job.company}</p>
                                </div>
                                {job.isFeatured && (
                                  <span className="badge bg-primary">Featured</span>
                                )}
                              </div>
                              <div className="mb-3">
                                <span className="badge bg-light text-dark me-2">📍 {job.location}</span>
                                <span className="badge bg-light text-dark me-2">💼 {job.jobType}</span>
                                <span className="badge bg-light text-dark me-2">📊 {job.experienceLevel}</span>
                                {job.industry && (
                                  <span className="badge bg-light text-dark">🏢 {job.industry}</span>
                                )}
                              </div>
                              <p className="mb-2" style={{opacity: 0.8}}>
                                {job.description?.substring(0, 150)}...
                              </p>
                            </div>
                            <div className="col-md-3 text-md-end">
                              <div className="fw-bold mb-2" style={{color: '#4078FF', fontSize: '1.1rem'}}>
                                {job.salary}
                              </div>
                              <small className="text-muted">
                                Posted {new Date(job.postedAt).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      {[...Array(pagination.pages)].map((_, index) => (
                        <li key={index} className={`page-item ${pagination.currentPage === index + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => {
                              const params = Object.fromEntries(searchParams);
                              params.page = index + 1;
                              setSearchParams(params);
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobListing;

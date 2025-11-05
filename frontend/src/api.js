import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: (id) => api.get(`/auth/profile/${id}`),
  updateProfile: (id, data) => api.put(`/auth/profile/${id}`, data)
};

// Job APIs
export const jobAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  toggleActive: (id) => api.patch(`/jobs/${id}/toggle-active`),
  getByEmployer: (employerId) => api.get(`/jobs/employer/${employerId}`)
};

// Application APIs
export const applicationAPI = {
  submit: (data) => api.post('/applications', data),
  getByJob: (jobId, status) => api.get(`/applications/job/${jobId}`, { params: { status } }),
  getByUser: (userId) => api.get(`/applications/user/${userId}`),
  getById: (id) => api.get(`/applications/${id}`),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  delete: (id) => api.delete(`/applications/${id}`),
  getStats: (employerId) => api.get(`/applications/stats/employer/${employerId}`)
};

// Saved Job APIs
export const savedJobAPI = {
  save: (data) => api.post('/saved-jobs', data),
  getByUser: (userId) => api.get(`/saved-jobs/user/${userId}`),
  remove: (id) => api.delete(`/saved-jobs/${id}`),
  checkSaved: (userId, jobId) => api.get(`/saved-jobs/check/${userId}/${jobId}`)
};

export default api;

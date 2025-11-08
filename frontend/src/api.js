import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh-token'),
  getProfile: (id) => api.get(`/auth/profile/${id}`),
  updateProfile: (id, data) => api.put(`/auth/profile/${id}`, data),
  changePassword: (data) => api.put('/auth/change-password', data)
};

// Job APIs
export const jobAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  toggleActive: (id) => api.patch(`/jobs/${id}/toggle-active`),
  getMyJobs: () => api.get('/jobs/employer/my-jobs'),
  getByEmployer: (employerId) => api.get(`/jobs/employer/${employerId}`)
};

// Application APIs
export const applicationAPI = {
  submit: (data) => api.post('/applications', data),
  getMyApplications: () => api.get('/applications/my-applications'),
  getByJob: (jobId, status) => api.get(`/applications/job/${jobId}`, { params: { status } }),
  getByUser: (userId) => api.get(`/applications/user/${userId}`),
  getById: (id) => api.get(`/applications/${id}`),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
  getStats: () => api.get('/applications/stats/employer')
};

// Saved Job APIs
export const savedJobAPI = {
  save: (data) => api.post('/saved-jobs', data),
  getMySavedJobs: () => api.get('/saved-jobs/my-saved-jobs'),
  getByUser: (userId) => api.get(`/saved-jobs/user/${userId}`),
  remove: (id) => api.delete(`/saved-jobs/${id}`),
  removeByJobId: (jobId) => api.delete(`/saved-jobs/job/${jobId}`),
  checkSaved: (jobId) => api.get(`/saved-jobs/check/${jobId}`)
};

export default api;

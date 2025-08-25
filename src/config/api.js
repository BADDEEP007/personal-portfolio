// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000'
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://portfolio-backend-q32uwahl2-baddeeps-projects.vercel.app'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// API endpoints
export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/api/contact`,
  adminLogin: `${API_BASE_URL}/api/admin/login`,
  analytics: `${API_BASE_URL}/api/admin/analytics`,
  updateSubmission: `${API_BASE_URL}/api/admin/submissions`
};
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add Basic Auth if credentials are stored
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Basic ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.message;
      console.error('API Error:', message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Service Methods
const api = {
  // Health check
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all profiles (for directory)
  getAllProfiles: async () => {
    try {
      const response = await apiClient.get('/profiles');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get profile by username
  getProfileByUsername: async (username) => {
    try {
      const response = await apiClient.get(`/profiles/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new profile (public)
  createProfile: async (profileData) => {
    try {
      const response = await apiClient.post('/profiles', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get complete profile (legacy)
  getProfile: async () => {
    try {
      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update profile (protected)
  updateProfile: async (username, profileData, credentials) => {
    try {
      const token = btoa(`${credentials.username}:${credentials.password}`);
      const response = await apiClient.patch(`/profiles/${username}`, profileData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all projects
  getProjects: async (skill = null) => {
    try {
      const url = skill ? `/projects?skill=${encodeURIComponent(skill)}` : '/projects';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single project
  getProjectById: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new project (protected)
  addProject: async (projectData, credentials) => {
    try {
      const token = btoa(`${credentials.username}:${credentials.password}`);
      const response = await apiClient.post('/projects', projectData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update project (protected)
  updateProject: async (id, projectData, credentials) => {
    try {
      const token = btoa(`${credentials.username}:${credentials.password}`);
      const response = await apiClient.patch(`/projects/${id}`, projectData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project (protected)
  deleteProject: async (id, credentials) => {
    try {
      const token = btoa(`${credentials.username}:${credentials.password}`);
      const response = await apiClient.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search profile
  searchProfile: async (query) => {
    try {
      const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all skills
  getSkills: async () => {
    try {
      const response = await apiClient.get('/skills');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get top skills
  getTopSkills: async () => {
    try {
      const response = await apiClient.get('/skills/top');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;

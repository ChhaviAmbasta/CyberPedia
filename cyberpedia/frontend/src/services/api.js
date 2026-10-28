import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth API
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

// Roadmap API
export const generateRoadmap = (domain, level, mode) =>
  api.post('/roadmap/generate', { domain, level, mode });

// Content API
export const getTopic = (id) =>
  api.get(`/content/${id}`);

export const getAllTopics = () =>
  api.get('/content/');

// Lab API
export const executeCommand = (command) =>
  api.post('/lab/execute', { command });

export const getAvailableCommands = () =>
  api.get('/lab/commands');

export default api;

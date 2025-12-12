import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // 5 second timeout
});

// Request interceptor - add auth token if exists
API.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user && user.id) {
            // For now, send user ID in header (we'll add JWT later)
            config.headers['X-User-Id'] = user.id;
            config.headers['X-User-Role'] = user.role || 'STUDENT';
        }
        console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
API.interceptors.response.use(
    (response) => {
        console.log(`⬅️ ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ Response error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message
        });

        // Handle specific errors
        if (error.response?.status === 401) {
            // Unauthorized - clear user and redirect to login
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default API;
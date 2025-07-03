import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // or navigate using react-router
        }
        return Promise.reject(error);
    }
);

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

apiPublic.interceptors.request.use(
  (config) => {
    // public api → no token
    return config;
  },
  (error) => {
    return Promise.reject(error?.response?.data || error);
  },
);

apiPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Public API error:', error);

    const data = error?.response?.data || {};

    // agar backend message array bheje
    if (Array.isArray(data?.message)) {
      data.message = data.message[0];
    }

    return Promise.reject(data);
  },
);

export const publicGet = async (url: string, params?: any) => {
  return apiPublic.get(url, { params });
};

export const publicPost = async (url: string, body?: any) => {
  return apiPublic.post(url, body);
};

export const publicPut = async (url: string, body?: any) => {
  return apiPublic.put(url, body);
};

export const publicDelete = async (url: string) => {
  return apiPublic.delete(url);
};

export default apiPublic;

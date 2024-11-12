import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: apiBaseUrl,
});

export const api = async (url, method) => {
  try {
    const config = {
      url,
      method,
      headers: {},
    };

    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    if (error === 'ECONNABORTED') {
      return Promise.reject(error);
    }
    throw error;
  }
};

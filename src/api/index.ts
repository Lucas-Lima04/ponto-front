/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3333'
  //baseURL: 'http://15.228.233.17:3333'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject("Servidor indisponível");
    }

    if ((error.response.status === 401 || error.response.status === 403) && window.location.pathname !== '/login') {
      localStorage.removeItem("accessToken");
      window.location.replace("/login");
      return Promise.reject(error.response.data.message);
    }

    toast.error(error.response.data.message);
    
    return Promise.reject(error.response.data.message);
  },
);

export default api;

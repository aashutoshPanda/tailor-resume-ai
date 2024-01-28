// api.js
import axios from "axios";
import { localStorageKeyAPIToken } from "../constants/api";

const instance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL });

// Add an interceptor for authorization headers
instance.interceptors.request.use((config) => {
  // Retrieve token from local storage
  const token = localStorage.getItem(localStorageKeyAPIToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;

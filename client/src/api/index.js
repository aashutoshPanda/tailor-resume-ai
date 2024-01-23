// api.js
import axios from "axios";
import { baseURL } from "../constants/api";
import { localStorageKeyAPIToken } from "../constants/api";

const instance = axios.create({ baseURL });

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

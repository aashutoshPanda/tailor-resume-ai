// api.js
import axios from "axios";
import { localStorageKeyAPIToken } from "../constants/api";

// Set base URL based on environment
const baseURL = process.env.REACT_ENV === "PRODUCTION" ? process.env._PROD : process.env._LOCAL;

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

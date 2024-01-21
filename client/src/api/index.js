// api.js
import axios from "axios";
import { baseURL } from "../constants/api";

const instance = axios.create({ baseURL });

// Add an interceptor for authorization headers
instance.interceptors.request.use((config) => {
  // using this token for dev only
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJiOWViYTNhOTY0Mzk2Y2FmODk1YyIsImlhdCI6MTcwNTg3MDM5NSwiZXhwIjoxNzA1OTU2Nzk1fQ.kn1XpSoTa9R-btlvmzIfM0CHNOhugdl0RDZjCn3S9Xo";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;

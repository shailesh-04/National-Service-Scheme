import axios from "axios";
import { BASE_URL } from "./config";
import { storage } from "@/store/storage"; // Ensure this import is correct

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Handle errors in public API requests
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Public API request error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  async (config) => {
    try {
      const token = storage?.getItem("accessToken"); // Ensure storage is defined
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
import useAlert from "@/store/useAlert";
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const setAlert = useAlert.getState().setAlert; // Access Zustand store
    if (error.code === "ECONNABORTED") {
       setAlert("Request Timeout: Server took too long to respond.", "error");
    } else if (!error.response) {
      setAlert("Network Error: Server is unreachable..", "error");
    }
    return Promise.reject(error);
  }
);

import axios from "axios";

import useAlert from "@/store/useAlert";
const BASE_URL = "http://192.168.43.2:3000/api/";//process.env.EXPO_PUBLIC_API_URL;
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const setAlert = useAlert.getState().setAlert; // Access Zustand store
    if (error.code === "ECONNABORTED") {
      setAlert("Request Timeout: Server took too long to respond.", "error");
    } else if (!error.response) {
      setAlert("Network Error: Server is unreachable.", "error");
    }
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export const ExpireApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

ExpireApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const setAlert = useAlert.getState().setAlert; // Access Zustand store
    if (error.code === "ECONNABORTED") {
      setAlert("Request Timeout: Server took too long to respond.", "error");
    } else if (!error.response) {
      setAlert("Network Error: Server is unreachable.", "error");
    }
    console.error(error);
    return Promise.reject(error);
  }
);
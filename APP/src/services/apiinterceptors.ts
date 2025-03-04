import axios from "axios";
import { BASE_URL } from "./config";
import useAlert from "@/store/useAlert";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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
    return Promise.reject(error);
  }
);
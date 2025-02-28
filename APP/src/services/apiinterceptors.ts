    import axios from "axios";
    import { BASE_URL } from "./config";
    //import { storage } from "@/store/storage"; // Ensure correct import if using storage
    export const publicApi = axios.create({
        baseURL: BASE_URL,
        headers: { "Content-Type": "application/json" }
    });
    publicApi.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log("Public API request error:", error.response?.data || error.message);
            return Promise.reject(error);
        }
    );
    


    export const api = axios.create({
        baseURL: BASE_URL,
    });
    // Add request interceptor to attach Authorization header
    api.interceptors.request.use(
        async (config) => {
            const accessToken = 'app';//storage.getString("access_token"); // Fetch token correctly
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );

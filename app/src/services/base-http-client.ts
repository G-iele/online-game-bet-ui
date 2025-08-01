import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const authHeader = {
  Authorization: undefined,
} as { Authorization: string | undefined };

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = authHeader.Authorization;
    return config;
  },
  (error) => {
    console.log("Error in request interceptor", error);
    return Promise.reject(error);
  },
);

const setAuthToken = (token: string | null) => {
  authHeader.Authorization = token ? `Bearer ${token}` : undefined;
};

export { authHeader, axiosInstance as httpClient, setAuthToken };

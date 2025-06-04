import axios from "axios";

// Create an axios instance
const apiClient = axios.create({
  baseURL: "https://localhost:7209/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // Implement token refresh logic here if needed
      // e.g. const newToken = await refreshToken();
      // localStorage.setItem("authToken", newToken);
      // apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
      // return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

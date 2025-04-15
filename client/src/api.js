import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status == 500 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token available");

        const res = await axios.post(`${API_BASE_URL}/refresh`, { refreshToken });

        localStorage.setItem("token", res.data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed, logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }

    return Promise.reject(error);
  }
);

export default api;

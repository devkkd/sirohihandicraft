import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(original);
      } catch {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

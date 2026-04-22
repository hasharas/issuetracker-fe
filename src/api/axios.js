import axios from "axios";

const api = axios.create({
      baseURL: "/api",
      headers: { "Content-Type": "application/json" },
});

// Attach token to every request
api.interceptors.request.use((config) => {
      const raw = localStorage.getItem("auth-store");
      const token = raw ? JSON.parse(raw)?.state?.token : null;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
});

// Handle 401 globally
api.interceptors.response.use(
      (res) => res,
      (err) => {
            if (err.response?.status === 401) {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
            }
            return Promise.reject(err);
      }
);

export default api;
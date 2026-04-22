import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import toast from "react-hot-toast";

const useAuthStore = create(
      persist(
            (set, get) => ({
                  user: null,
                  token: null,
                  loading: false,

                  register: async (data) => {
                        set({ loading: true });
                        try {
                              const res = await api.post("/auth/register", data);
                              set({ user: res.data.user, token: res.data.token, loading: false });
                              toast.success("Account created successfully!");
                              return true;
                        } catch (err) {
                              set({ loading: false });
                              toast.error(err.response?.data?.message || "Registration failed");
                              return false;
                        }
                  },

                  login: async (data) => {
                        set({ loading: true });
                        try {
                              const res = await api.post("/auth/login", data);
                              set({ user: res.data.user, token: res.data.token, loading: false });
                              toast.success(`Welcome back, ${res.data.user.name}!`);
                              return true;
                        } catch (err) {
                              set({ loading: false });
                              toast.error(err.response?.data?.message || "Login failed");
                              return false;
                        }
                  },

                  logout: () => {
                        set({ user: null, token: null });
                        toast.success("Logged out successfully");
                  },

                  fetchMe: async () => {
                        set({ loading: true });
                        try {
                              const res = await api.get("/auth/me");
                              set({ user: res.data.user, loading: false });
                        } catch {
                              set({ user: null, token: null, loading: false });
                              localStorage.removeItem("token");
                        }
                  },
            }),
            { name: "auth-store", partialize: (state) => ({ token: state.token, user: state.user }) }
      )
);

export default useAuthStore;
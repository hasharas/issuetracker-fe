import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

const useIssueStore = create((set, get) => ({
      issues: [],
      currentIssue: null,
      pagination: { total: 0, page: 1, pages: 1, limit: 10 },
      counts: { Open: 0, "In Progress": 0, Resolved: 0, Closed: 0 },
      loading: false,
      filters: { status: "", priority: "", severity: "", search: "", sortBy: "createdAt", order: "desc" },

      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),

      fetchIssues: async (page = 1) => {
            set({ loading: true });
            try {
                  const { filters } = get();
                  const params = new URLSearchParams({ page, limit: 10, ...filters });
                  // Remove empty values
                  [...params.keys()].forEach((k) => { if (!params.get(k)) params.delete(k); });
                  const res = await api.get(`/issues?${params}`);
                  set({
                        issues: res.data.data,
                        pagination: { ...res.data.pagination },
                        counts: res.data.counts,
                        loading: false,
                  });
            } catch (err) {
                  set({ loading: false });
                  toast.error("Failed to fetch issues");
            }
      },

      fetchIssue: async (id) => {
            set({ loading: true });
            try {
                  const res = await api.get(`/issues/${id}`);
                  set({ currentIssue: res.data.data, loading: false });
            } catch {
                  set({ loading: false });
                  toast.error("Issue not found");
            }
      },

      createIssue: async (data) => {
            try {
                  const res = await api.post("/issues", data);
                  toast.success("Issue created successfully!");
                  return res.data.data;
            } catch (err) {
                  toast.error(err.response?.data?.message || "Failed to create issue");
                  return null;
            }
      },

      updateIssue: async (id, data) => {
            try {
                  const res = await api.put(`/issues/${id}`, data);
                  set((state) => ({
                        issues: state.issues.map((i) => (i._id === id ? res.data.data : i)),
                        currentIssue: res.data.data,
                  }));
                  toast.success("Issue updated!");
                  return res.data.data;
            } catch (err) {
                  toast.error(err.response?.data?.message || "Failed to update issue");
                  return null;
            }
      },

      deleteIssue: async (id) => {
            try {
                  await api.delete(`/issues/${id}`);
                  set((state) => ({ issues: state.issues.filter((i) => i._id !== id) }));
                  toast.success("Issue deleted");
                  return true;
            } catch {
                  toast.error("Failed to delete issue");
                  return false;
            }
      },
}));

export default useIssueStore;
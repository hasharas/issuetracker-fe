import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useIssueStore from "../../store/issueStore";

function useDebounce(value, delay) {
      const [debounced, setDebounced] = useState(value);
      useEffect(() => {
            const t = setTimeout(() => setDebounced(value), delay);
            return () => clearTimeout(t);
      }, [value, delay]);
      return debounced;
}

export default function IssueFilters({ onFilter }) {
      const { filters, setFilters } = useIssueStore();
      const [searchInput, setSearchInput] = useState(filters.search || "");
      const debouncedSearch = useDebounce(searchInput, 400);

      useEffect(() => {
            setFilters({ search: debouncedSearch });
            onFilter();
      }, [debouncedSearch]);

      const handleChange = (key, value) => {
            setFilters({ [key]: value });
            onFilter();
      };

      const clearFilters = () => {
            setSearchInput("");
            setFilters({ status: "", priority: "", severity: "", search: "", sortBy: "createdAt", order: "desc" });
            onFilter();
      };

      const hasActive = filters.status || filters.priority || filters.severity || filters.search;

      return (
            <div className="glass rounded-2xl p-4 space-y-3">
                  <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                              placeholder="Search issues..."
                              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                        <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
                        {[
                              { key: "status", opts: ["Open", "In Progress", "Resolved", "Closed"] },
                              { key: "priority", opts: ["Low", "Medium", "High", "Critical"] },
                              { key: "severity", opts: ["Minor", "Major", "Critical", "Blocker"] },
                        ].map(({ key, opts }) => (
                              <select key={key} value={filters[key]} onChange={(e) => handleChange(key, e.target.value)}
                                    className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-violet-500 capitalize cursor-pointer">
                                    <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                                    {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                              </select>
                        ))}

                        <select value={`${filters.sortBy}:${filters.order}`}
                              onChange={(e) => { const [sortBy, order] = e.target.value.split(":"); handleChange("sortBy", sortBy); setFilters({ order }); onFilter(); }}
                              className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-violet-500 cursor-pointer">
                              <option value="createdAt:desc">Newest First</option>
                              <option value="createdAt:asc">Oldest First</option>
                              <option value="priority:desc">Priority High</option>
                              <option value="updatedAt:desc">Recently Updated</option>
                        </select>

                        {hasActive && (
                              <button onClick={clearFilters}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-sm transition-colors">
                                    <X className="w-3.5 h-3.5" /> Clear
                              </button>
                        )}
                  </div>
            </div>
      );
}
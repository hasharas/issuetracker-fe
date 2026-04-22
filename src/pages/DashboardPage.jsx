import { useEffect, useCallback, useState } from "react";
import { Download, FileJson, FileText } from "lucide-react";
import useIssueStore from "../store/issueStore";
import IssueStats from "../components/issues/IssueStats";
import IssueFilters from "../components/issues/IssueFilters";
import IssueCard from "../components/issues/IssueCard";
import Pagination from "../components/ui/Pagination";
import Spinner from "../components/ui/Spinner";
import api from "../api/axios";
import { exportToCSV, exportToJSON } from "../utils/exportUtils";

export default function DashboardPage() {
      const { issues, pagination, counts, loading, fetchIssues } = useIssueStore();
      const [exportOpen, setExportOpen] = useState(false);

      useEffect(() => { fetchIssues(1); }, []);

      const handleFilter = useCallback(() => { fetchIssues(1); }, [fetchIssues]);

      const handleExport = async (type) => {
            try {
                  const res = await api.get("/issues/export");
                  type === "csv" ? exportToCSV(res.data.data) : exportToJSON(res.data.data);
                  setExportOpen(false);
            } catch { }
      };

      return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                        <div>
                              <h1 className="font-display font-bold text-2xl text-white">Dashboard</h1>
                              <p className="text-zinc-500 text-sm mt-1">{pagination.total} total issues</p>
                        </div>
                        <div className="relative">
                              <button onClick={() => setExportOpen(!exportOpen)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors border border-zinc-700">
                                    <Download className="w-4 h-4" /> Export
                              </button>
                              {exportOpen && (
                                    <div className="absolute right-0 mt-2 w-40 glass rounded-xl overflow-hidden z-10 animate-scale-in">
                                          <button onClick={() => handleExport("csv")}
                                                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                                                <FileText className="w-4 h-4 text-emerald-400" /> Export CSV
                                          </button>
                                          <button onClick={() => handleExport("json")}
                                                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                                                <FileJson className="w-4 h-4 text-blue-400" /> Export JSON
                                          </button>
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Stats */}
                  <IssueStats counts={counts} />

                  {/* Filters */}
                  <IssueFilters onFilter={handleFilter} />

                  {/* Issues grid */}
                  {loading ? (
                        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
                  ) : issues.length === 0 ? (
                        <div className="text-center py-20 glass rounded-2xl">
                              <div className="text-5xl mb-4">🎯</div>
                              <h3 className="font-display font-bold text-zinc-300 text-lg">No issues found</h3>
                              <p className="text-zinc-500 mt-2 text-sm">Create your first issue or adjust filters</p>
                        </div>
                  ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                              {issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)}
                        </div>
                  )}

                  {/* Pagination */}
                  {!loading && <Pagination pagination={pagination} onPageChange={fetchIssues} />}
            </main>
      );
}
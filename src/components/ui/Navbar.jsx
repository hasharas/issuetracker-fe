import { Link, useNavigate, useLocation } from "react-router-dom";
import { Plus, LogOut, Zap } from "lucide-react";
import useAuthStore from "../../store/authStore";

export default function Navbar() {
      const { user, logout } = useAuthStore();
      const navigate = useNavigate();
      const location = useLocation();

      const handleLogout = () => { logout(); navigate("/login"); };

      return (
            <nav className="sticky top-0 z-40 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                              <Link to="/dashboard" className="flex items-center gap-2.5 group">
                                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                                          <Zap className="w-4 h-4 text-white fill-white" />
                                    </div>
                                    <span className="font-display font-bold text-white text-lg tracking-tight">IssueFlow</span>
                              </Link>

                              <div className="flex items-center gap-3">
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                                          <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
                                                {user?.name?.charAt(0).toUpperCase()}
                                          </div>
                                          <span className="text-zinc-300 text-sm font-medium">{user?.name}</span>
                                    </div>
                                    <Link to="/issues/new"
                                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/20">
                                          <Plus className="w-4 h-4" />
                                          <span className="hidden sm:inline">New Issue</span>
                                    </Link>
                                    <button onClick={handleLogout}
                                          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                          <LogOut className="w-4 h-4" />
                                    </button>
                              </div>
                        </div>
                  </div>
            </nav>
      );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Loader } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function LoginPage() {
      const [form, setForm] = useState({ email: "", password: "" });
      const { login, loading } = useAuthStore();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            const ok = await login(form);
            if (ok) navigate("/dashboard");
      };

      const inputCls = "w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all";

      return (
            <div className="min-h-screen flex items-center justify-center px-4">
                  {/* Background glow */}
                  <div className="fixed inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
                  </div>

                  <div className="w-full max-w-md animate-slide-up">
                        <div className="text-center mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
                                    <Zap className="w-7 h-7 text-white fill-white" />
                              </div>
                              <h1 className="font-display font-bold text-3xl text-white">Welcome back</h1>
                              <p className="text-zinc-500 mt-2 text-sm">Sign in to your IssueFlow account</p>
                        </div>

                        <div className="glass rounded-2xl p-8">
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Email</label>
                                          <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                                required placeholder="you@company.com" className={inputCls} />
                                    </div>
                                    <div>
                                          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Password</label>
                                          <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                                                required placeholder="••••••••" className={inputCls} />
                                    </div>

                                    <button type="submit" disabled={loading}
                                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-xl text-white font-semibold mt-2 transition-all hover:shadow-lg hover:shadow-violet-500/25">
                                          {loading && <Loader className="w-4 h-4 animate-spin" />}
                                          Sign In
                                    </button>
                              </form>

                              <p className="text-center mt-6 text-sm text-zinc-500">
                                    No account?{" "}
                                    <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                          Create one free
                                    </Link>
                              </p>
                        </div>
                  </div>
            </div>
      );
}
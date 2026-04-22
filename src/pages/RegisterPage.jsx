import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Loader } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function RegisterPage() {
      const [form, setForm] = useState({ name: "", email: "", password: "" });
      const { register, loading } = useAuthStore();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            const ok = await register(form);
            if (ok) navigate("/dashboard");
      };

      const inputCls = "w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all";

      return (
            <div className="min-h-screen flex items-center justify-center px-4">
                  <div className="fixed inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
                  </div>

                  <div className="w-full max-w-md animate-slide-up">
                        <div className="text-center mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
                                    <Zap className="w-7 h-7 text-white fill-white" />
                              </div>
                              <h1 className="font-display font-bold text-3xl text-white">Start tracking</h1>
                              <p className="text-zinc-500 mt-2 text-sm">Create your IssueFlow account</p>
                        </div>

                        <div className="glass rounded-2xl p-8">
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    {[
                                          { key: "name", label: "Full Name", type: "text", ph: "Your name" },
                                          { key: "email", label: "Email", type: "email", ph: "you@company.com" },
                                          { key: "password", label: "Password", type: "password", ph: "Min 6 characters" },
                                    ].map(({ key, label, type, ph }) => (
                                          <div key={key}>
                                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">{label}</label>
                                                <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                                                      required placeholder={ph} className={inputCls} />
                                          </div>
                                    ))}

                                    <button type="submit" disabled={loading}
                                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-xl text-white font-semibold mt-2 transition-all hover:shadow-lg hover:shadow-violet-500/25">
                                          {loading && <Loader className="w-4 h-4 animate-spin" />}
                                          Create Account
                                    </button>
                              </form>

                              <p className="text-center mt-6 text-sm text-zinc-500">
                                    Have an account?{" "}
                                    <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                          Sign in
                                    </Link>
                              </p>
                        </div>
                  </div>
            </div>
      );
}
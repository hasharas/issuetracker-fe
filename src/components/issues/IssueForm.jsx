import { useState } from "react";
import { Save, Loader } from "lucide-react";

const fields = {
      status: ["Open", "In Progress", "Resolved", "Closed"],
      priority: ["Low", "Medium", "High", "Critical"],
      severity: ["Minor", "Major", "Critical", "Blocker"],
};

export default function IssueForm({ initial = {}, onSubmit, loading, submitLabel = "Save Issue" }) {
      const [form, setForm] = useState({
            title: initial.title || "",
            description: initial.description || "",
            status: initial.status || "Open",
            priority: initial.priority || "Medium",
            severity: initial.severity || "Minor",
            assignedTo: initial.assignedTo || "",
            tags: initial.tags?.join(", ") || "",
      });

      const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

      const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit({ ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) });
      };

      const inputCls = "w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all";
      const labelCls = "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

      return (
            <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                        <label className={labelCls}>Title *</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                              placeholder="Brief, descriptive title..." className={inputCls} />
                  </div>

                  <div>
                        <label className={labelCls}>Description *</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required
                              rows={5} placeholder="Detailed description of the issue..." className={`${inputCls} resize-none`} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Object.entries(fields).map(([key, opts]) => (
                              <div key={key}>
                                    <label className={labelCls}>{key}</label>
                                    <select name={key} value={form[key]} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
                                          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                                    </select>
                              </div>
                        ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                              <label className={labelCls}>Assigned To</label>
                              <input name="assignedTo" value={form.assignedTo} onChange={handleChange}
                                    placeholder="Team member name..." className={inputCls} />
                        </div>
                        <div>
                              <label className={labelCls}>Tags (comma separated)</label>
                              <input name="tags" value={form.tags} onChange={handleChange}
                                    placeholder="bug, frontend, auth..." className={inputCls} />
                        </div>
                  </div>

                  <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25">
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {submitLabel}
                  </button>
            </form>
      );
}
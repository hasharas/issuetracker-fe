import { CircleDot, Clock, CheckCircle2, XCircle } from "lucide-react";

const stats = [
      { key: "Open", icon: CircleDot, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
      { key: "In Progress", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
      { key: "Resolved", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
      { key: "Closed", icon: XCircle, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
];

export default function IssueStats({ counts }) {
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {stats.map(({ key, icon: Icon, color, bg, border }) => (
                        <div key={key} className={`glass rounded-2xl p-4 border ${border} hover:scale-[1.02] transition-transform`}>
                              <div className="flex items-center justify-between mb-3">
                                    <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                                          <Icon className={`w-4 h-4 ${color}`} />
                                    </div>
                                    <span className={`text-2xl font-display font-bold ${color}`}>{counts[key] || 0}</span>
                              </div>
                              <p className="text-zinc-400 text-xs font-medium">{key}</p>
                              {total > 0 && (
                                    <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                          <div className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
                                                style={{ width: `${((counts[key] || 0) / total) * 100}%`, transition: "width 0.5s ease" }} />
                                    </div>
                              )}
                        </div>
                  ))}
            </div>
      );
}
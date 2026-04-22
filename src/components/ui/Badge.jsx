const variants = {
      // Status
      Open: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20",
      "In Progress": "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
      Resolved: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
      Closed: "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",
      // Priority
      Low: "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20",
      Medium: "bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20",
      High: "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20",
      Critical: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20",
      // Severity
      Minor: "bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20",
      Major: "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20",
      Blocker: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
};

const dots = {
      Open: "bg-blue-400", "In Progress": "bg-amber-400",
      Resolved: "bg-emerald-400", Closed: "bg-zinc-400",
      Low: "bg-sky-400", Medium: "bg-yellow-400", High: "bg-orange-400", Critical: "bg-red-400",
      Minor: "bg-teal-400", Major: "bg-purple-400", Blocker: "bg-rose-400",
};

export default function Badge({ label, showDot = true }) {
      return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono ${variants[label] || "bg-zinc-700 text-zinc-300"}`}>
                  {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dots[label] || "bg-zinc-400"}`} />}
                  {label}
            </span>
      );
}
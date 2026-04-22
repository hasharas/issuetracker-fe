import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";

export default function IssueCard({ issue }) {
      const timeAgo = (date) => {
            const d = Math.floor((Date.now() - new Date(date)) / 1000);
            if (d < 60) return "just now";
            if (d < 3600) return `${Math.floor(d / 60)}m ago`;
            if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
            return `${Math.floor(d / 86400)}d ago`;
      };

      return (
            <Link to={`/issues/${issue._id}`}
                  className="glass rounded-2xl p-5 block hover:border-violet-500/30 hover:bg-white/[0.05] transition-all group animate-fade-in">
                  <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display font-semibold text-white text-sm leading-snug group-hover:text-violet-300 transition-colors line-clamp-2 flex-1">
                              {issue.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                  </div>

                  <p className="text-zinc-500 text-xs line-clamp-2 mb-4 leading-relaxed">{issue.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                        <Badge label={issue.status} />
                        <Badge label={issue.priority} />
                        <Badge label={issue.severity} />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-zinc-600">
                        <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {timeAgo(issue.createdAt)}
                        </span>
                        {issue.assignedTo && (
                              <span className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    {issue.assignedTo}
                              </span>
                        )}
                        <span className="font-mono text-zinc-700 ml-auto">#{issue._id.slice(-6)}</span>
                  </div>
            </Link>
      );
}
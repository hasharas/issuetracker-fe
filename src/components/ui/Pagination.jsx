import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, onPageChange }) {
      const { page, pages, total, limit } = pagination;
      if (pages <= 1) return null;

      return (
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <span className="text-zinc-500 text-sm">
                        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
                  </span>
                  <div className="flex items-center gap-1">
                        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
                              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                              const p = i + 1;
                              return (
                                    <button key={p} onClick={() => onPageChange(p)}
                                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-violet-600 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}>
                                          {p}
                                    </button>
                              );
                        })}
                        <button disabled={page === pages} onClick={() => onPageChange(page + 1)}
                              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                              <ChevronRight className="w-4 h-4" />
                        </button>
                  </div>
            </div>
      );
}
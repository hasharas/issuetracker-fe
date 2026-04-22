import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmLabel = "Confirm", danger = true }) {
      if (!isOpen) return null;
      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                  <div className="glass rounded-2xl p-6 max-w-sm w-full animate-scale-in">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${danger ? "bg-red-500/10" : "bg-violet-500/10"}`}>
                              <AlertTriangle className={`w-6 h-6 ${danger ? "text-red-400" : "text-violet-400"}`} />
                        </div>
                        <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
                        <p className="text-zinc-400 text-sm mb-6">{message}</p>
                        <div className="flex gap-3">
                              <button onClick={onCancel}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors">
                                    Cancel
                              </button>
                              <button onClick={onConfirm}
                                    className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${danger ? "bg-red-600 hover:bg-red-500" : "bg-violet-600 hover:bg-violet-500"}`}>
                                    {confirmLabel}
                              </button>
                        </div>
                  </div>
            </div>
      );
}
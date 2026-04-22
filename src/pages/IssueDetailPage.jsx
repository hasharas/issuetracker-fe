import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, CheckCircle2, XCircle, Tag, Clock, User } from "lucide-react";
import useIssueStore from "../store/issueStore";
import IssueForm from "../components/issues/IssueForm";
import Badge from "../components/ui/Badge";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Spinner from "../components/ui/Spinner";

export default function IssueDetailPage() {
      const { id } = useParams();
      const navigate = useNavigate();
      const { currentIssue, fetchIssue, updateIssue, deleteIssue, loading } = useIssueStore();
      const [editing, setEditing] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const [statusDialog, setStatusDialog] = useState(null);
      const [updating, setUpdating] = useState(false);

      useEffect(() => { fetchIssue(id); }, [id]);

      const handleUpdate = async (data) => {
            setUpdating(true);
            await updateIssue(id, data);
            setUpdating(false);
            setEditing(false);
      };

      const handleDelete = async () => {
            const ok = await deleteIssue(id);
            if (ok) navigate("/dashboard");
      };

      const handleStatusChange = async () => {
            setUpdating(true);
            await updateIssue(id, { status: statusDialog });
            setUpdating(false);
            setStatusDialog(null);
      };

      if (loading && !currentIssue) return (
            <div className="flex justify-center items-center min-h-[60vh]"><Spinner size="lg" /></div>
      );
      if (!currentIssue) return null;

      const issue = currentIssue;
      const createdAt = new Date(issue.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      return (
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-slide-up">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                        <Link to="/dashboard"
                              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                              <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div className="flex-1 min-w-0">
                              <span className="text-zinc-600 font-mono text-xs">#{id.slice(-6)}</span>
                              <h1 className="font-display font-bold text-xl text-white truncate">{issue.title}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                              {issue.status !== "Resolved" && (
                                    <button onClick={() => setStatusDialog("Resolved")}
                                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-sm transition-colors border border-emerald-500/20">
                                          <CheckCircle2 className="w-4 h-4" /> Resolve
                                    </button>
                              )}
                              {issue.status !== "Closed" && (
                                    <button onClick={() => setStatusDialog("Closed")}
                                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-sm transition-colors">
                                          <XCircle className="w-4 h-4" /> Close
                                    </button>
                              )}
                              <button onClick={() => setEditing(!editing)}
                                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                    <Pencil className="w-4 h-4" />
                              </button>
                              <button onClick={() => setDeleteOpen(true)}
                                    className="p-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                              </button>
                        </div>
                  </div>

                  {editing ? (
                        <div className="glass rounded-2xl p-6">
                              <h2 className="font-display font-semibold text-white mb-6">Edit Issue</h2>
                              <IssueForm initial={issue} onSubmit={handleUpdate} loading={updating} submitLabel="Update Issue" />
                        </div>
                  ) : (
                        <div className="space-y-4">
                              {/* Main card */}
                              <div className="glass rounded-2xl p-6">
                                    <div className="flex flex-wrap gap-2 mb-5">
                                          <Badge label={issue.status} />
                                          <Badge label={issue.priority} />
                                          <Badge label={issue.severity} />
                                    </div>

                                    <h2 className="font-display font-semibold text-zinc-300 text-sm uppercase tracking-wider mb-3">Description</h2>
                                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{issue.description}</p>

                                    {issue.tags?.length > 0 && (
                                          <div className="flex items-center gap-2 mt-5 pt-5 border-t border-zinc-800">
                                                <Tag className="w-4 h-4 text-zinc-500" />
                                                <div className="flex flex-wrap gap-1.5">
                                                      {issue.tags.map((tag) => (
                                                            <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono">{tag}</span>
                                                      ))}
                                                </div>
                                          </div>
                                    )}
                              </div>

                              {/* Meta card */}
                              <div className="glass rounded-2xl p-5 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Created</p>
                                          <div className="flex items-center gap-2 text-zinc-300">
                                                <Clock className="w-4 h-4 text-zinc-500" /> {createdAt}
                                          </div>
                                    </div>
                                    {issue.assignedTo && (
                                          <div>
                                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Assigned To</p>
                                                <div className="flex items-center gap-2 text-zinc-300">
                                                      <User className="w-4 h-4 text-zinc-500" /> {issue.assignedTo}
                                                </div>
                                          </div>
                                    )}
                                    <div>
                                          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Reporter</p>
                                          <div className="flex items-center gap-2 text-zinc-300">
                                                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-xs text-white font-bold">
                                                      {issue.createdBy?.name?.charAt(0)}
                                                </div>
                                                {issue.createdBy?.name}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}

                  {/* Delete confirm */}
                  <ConfirmDialog isOpen={deleteOpen} title="Delete Issue"
                        message="This action cannot be undone. The issue will be permanently removed."
                        confirmLabel="Delete Issue" onConfirm={handleDelete} onCancel={() => setDeleteOpen(false)} />

                  {/* Status confirm */}
                  <ConfirmDialog isOpen={!!statusDialog}
                        title={`Mark as ${statusDialog}`}
                        message={`Are you sure you want to mark this issue as ${statusDialog}?`}
                        confirmLabel={`Yes, mark ${statusDialog}`} danger={statusDialog === "Closed"}
                        onConfirm={handleStatusChange} onCancel={() => setStatusDialog(null)} />
            </main>
      );
}
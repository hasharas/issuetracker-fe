import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useIssueStore from "../store/issueStore";
import IssueForm from "../components/issues/IssueForm";

export default function CreateIssuePage() {
      const { createIssue } = useIssueStore();
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const handleSubmit = async (data) => {
            setLoading(true);
            const issue = await createIssue(data);
            setLoading(false);
            if (issue) navigate(`/issues/${issue._id}`);
      };

      return (
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                  <div className="flex items-center gap-3 mb-8">
                        <Link to="/dashboard"
                              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                              <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                              <h1 className="font-display font-bold text-2xl text-white">Create Issue</h1>
                              <p className="text-zinc-500 text-sm">Report a new issue to track</p>
                        </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                        <IssueForm onSubmit={handleSubmit} loading={loading} />
                  </div>
            </main>
      );
}
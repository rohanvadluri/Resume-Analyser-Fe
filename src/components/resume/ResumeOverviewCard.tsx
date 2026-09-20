import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText, Sparkles } from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

import { getMyResume, downloadResume } from "../../services/resumeService";
import type { ResumeResponse } from "../../types/resume";

function ResumeOverviewCard() {
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setIsLoading(true);

      const response = await getMyResume();

      setResume(response);
    } catch (error) {
      console.error("Failed to load resume:", error);

      setResume(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resume) {
      return;
    }

    try {
      const blob = await downloadResume(resume.resumeId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = resume.originalFileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };
  const handleView = async () => {
    if (!resume) {
      return;
    }

    try {
      const blob = await downloadResume(resume.resumeId);

      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("Failed to view resume:", error);
    }
  };

  return (
    <Card>
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Current Resume</h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Your latest uploaded resume
            </p>
          </div>
        </div>

        <Badge variant="success">{resume?.resumeStatus ?? "No Resume"}</Badge>
      </div>

      {/* Resume Information */}

      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
            <FileText className="h-5 w-5 text-slate-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {isLoading
                ? "Loading resume..."
                : (resume?.originalFileName ?? "No resume uploaded")}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {isLoading
                ? "Please wait..."
                : resume
                  ? `${resume.fileType} • Uploaded on ${new Date(
                      resume.uploadDate,
                    ).toLocaleDateString()}`
                  : "Upload a resume to get started"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={!resume}
          onClick={handleView}
        >
          <ExternalLink className="h-4 w-4" />
          View
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={!resume}
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>

        <Button
          size="sm"
          className="ml-auto"
          disabled={!resume}
          onClick={() => navigate("/analysis")}
        >
          <Sparkles className="h-4 w-4" />
          Analyze Resume
        </Button>
      </div>
    </Card>
  );
}

export default ResumeOverviewCard;

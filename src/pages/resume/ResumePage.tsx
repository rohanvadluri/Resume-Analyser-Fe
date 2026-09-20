import { useEffect, useRef, useState } from "react";
import {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisDetails,
} from "../../services/analysisService";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Download,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  uploadResume,
  getResumeDetails,
  getMyResume,
  downloadResume,
  deleteResume,
} from "../../services/resumeService";
import type { ResumeUploadResponse, ResumeResponse } from "../../types/resume";
import type { AnalysisResponse } from "../../types/analysis";

function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [uploadedResume, setUploadedResume] =
    useState<ResumeUploadResponse | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [resumeDetails, setResumeDetails] = useState<ResumeResponse | null>(
    null,
  );

  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null,
  );

  /**
   * Load existing resume for logged-in user
   */
  useEffect(() => {
    const loadResumeAndAnalysis = async () => {
      try {
        // Load user's resume
        const response = await getMyResume();

        setResumeDetails(response);

        // Load latest analysis
        const history = await getAnalysisHistory(0, 1);

        if (
          history.content &&
          history.content.length > 0 &&
          history.content[0].resumeId === response.resumeId
        ) {
          const latestAnalysis = history.content[0];

          const analysisDetails = await getAnalysisDetails(
            latestAnalysis.analysisId,
          );

          setAnalysisResult(analysisDetails);
        } else {
          setAnalysisResult(null);
        }
      } catch (error) {
        console.log("No resume or analysis found. ", error);

        setResumeDetails(null);
        setAnalysisResult(null);  
      }
    };

    loadResumeAndAnalysis();
  }, []);
  /**
   * Handle file selection
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    setSuccessMessage("");

    setErrorMessage("");

    setUploadedResume(null);

    setAnalysisResult(null);
  };

  /**
   * Open file browser
   */
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Remove selected file
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);

    setSuccessMessage("");

    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Upload Resume
   */
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setIsUploading(true);

    setSuccessMessage("");

    setErrorMessage("");

    try {
      const response = await uploadResume(selectedFile);

      setUploadedResume(response);

      setSuccessMessage(response.message);

      const details = await getResumeDetails(response.resumeId);

      setResumeDetails(details);

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      //   setSelectedFile(null);
    } catch (error) {
      console.error("Resume upload failed:", error);

      setErrorMessage("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Analyze Resume
   */
  const handleAnalyze = async () => {
    if (!resumeDetails) {
      return;
    }

    setIsAnalyzing(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await analyzeResume(resumeDetails.resumeId);

      console.log("Resume analysis completed:", response);

      setAnalysisResult(response);

      setSuccessMessage("Resume analyzed successfully.");
    } catch (error) {
      console.error("Resume analysis failed:", error);

      setErrorMessage("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Download Resume
   */
  const handleDownload = async () => {
    if (!resumeDetails) {
      return;
    }

    setIsDownloading(true);
    setErrorMessage("");

    try {
      const blob = await downloadResume(resumeDetails.resumeId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = resumeDetails.originalFileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Resume download failed:", error);

      setErrorMessage("Failed to download resume. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Delete Resume
   */
  const handleDelete = async () => {
    if (!resumeDetails) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteResume(resumeDetails.resumeId);

      setResumeDetails(null);
      setUploadedResume(null);
      setSelectedFile(null);
      setAnalysisResult(null);

      setSuccessMessage("Resume deleted successfully.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Resume deletion failed:", error);

      setErrorMessage("Failed to delete resume. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Replace Resume
   */
  const handleReplace = () => {
    setSuccessMessage("");
    setErrorMessage("");

    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Resume
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload and manage your resume for AI-powered analysis.
        </p>
      </div>

      {/* ================================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ================================================= */}

      {successMessage && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />

          <span>{successMessage}</span>
        </div>
      )}

      {/* ================================================= */}
      {/* ERROR MESSAGE */}
      {/* ================================================= */}

      {errorMessage && (
        <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {errorMessage}
        </div>
      )}

      {/* ================================================= */}
      {/* UPLOAD CARD */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload your resume
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload your latest resume to get started.
          </p>
        </div>

        {/* FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* ================================================= */}
        {/* UPLOAD AREA */}
        {/* ================================================= */}

        {!selectedFile && !uploadedResume && (
          <button
            type="button"
            onClick={handleBrowseClick}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 transition hover:border-indigo-300 hover:bg-indigo-50/30"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <Upload className="h-6 w-6 text-indigo-600" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">
              Drop your resume here
            </p>

            <p className="mt-1 text-sm text-slate-500">
              or click to browse from your computer
            </p>

            <span className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm ring-1 ring-slate-200">
              Browse Files
            </span>

            <p className="mt-4 text-xs text-slate-400">PDF, DOC or DOCX</p>
          </button>
        )}

        {/* ================================================= */}
        {/* SELECTED FILE */}
        {/* ================================================= */}

        {selectedFile && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {!isUploading && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-rose-600"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Upload Button */}

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}

        {/* ================================================= */}
        {/* UPLOADED RESUME */}
        {/* ================================================= */}

        {uploadedResume && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {uploadedResume.originalFileName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Status: {uploadedResume.resumeStatus}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Resume ID: {uploadedResume.resumeId}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* RESUME DETAILS */}
      {/* ================================================= */}

      {resumeDetails && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Resume Details
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">File Name</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {resumeDetails.originalFileName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">File Type</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {resumeDetails.fileType}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">File Size</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {(resumeDetails.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Status</p>

              <p className="mt-1 text-sm font-medium text-emerald-600">
                {resumeDetails.resumeStatus}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Upload Date</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {new Date(resumeDetails.uploadDate).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Resume ID</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                #{resumeDetails.resumeId}
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* RESUME ACTIONS */}
          {/* ================================================= */}

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            {/* Download */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading || isDeleting || isAnalyzing}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />

              {isDownloading ? "Downloading..." : "Download Resume"}
            </button>

            {/* Replace */}

            <button
              type="button"
              onClick={handleReplace}
              disabled={isDownloading || isDeleting || isAnalyzing}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4" />
              Replace Resume
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={isDownloading || isDeleting || isAnalyzing}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              Delete Resume
            </button>
          </div>
          {/* ================================================= */}
          {/* ANALYZE RESUME */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || isDownloading || isDeleting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAnalyzing ? "Analyzing Resume..." : "✨ Analyze Resume"}
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* RESUME ANALYSIS RESULT */}
      {/* ================================================= */}

      {analysisResult && (
        <div className="mt-6 space-y-4">
          {/* Analysis Header */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Resume Analysis
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  AI-powered analysis of your resume
                </p>
              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {analysisResult.analysisStatus}
              </span>
            </div>
          </div>

          {/* ATS SCORE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium text-slate-500">ATS Score</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold text-indigo-600">
                {analysisResult.atsScore}
              </span>

              <span className="mb-2 text-sm text-slate-400">/ 100</span>
            </div>

            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${analysisResult.atsScore}%`,
                }}
              />
            </div>
          </div>

          {/* CANDIDATE INFORMATION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Candidate Information
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-400">Name</p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {analysisResult.extractedName || "Not detected"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Email</p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {analysisResult.extractedEmail || "Not detected"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Mobile</p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {analysisResult.extractedMobile || "Not detected"}
                </p>
              </div>
            </div>
          </div>

          {/* RESUME STATISTICS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Resume Statistics
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-400">Word Count</p>

                <p className="mt-1 text-xl font-semibold text-slate-800">
                  {analysisResult.wordCount}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Analysis ID</p>

                <p className="mt-1 text-xl font-semibold text-slate-800">
                  #{analysisResult.analysisId}
                </p>
              </div>
            </div>
          </div>

          {/* EXTRACTED SKILLS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Skills Found
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {analysisResult.extractedSkills ? (
                analysisResult.extractedSkills.split(",").map((skill) => (
                  <span
                    key={skill.trim()}
                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                  >
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">No skills detected.</p>
              )}
            </div>
          </div>

          {/* MISSING SKILLS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Missing Skills
            </h3>

            <div className="mt-4">
              {analysisResult.missingSkills ? (
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missingSkills.split(",").map((skill) => (
                    <span
                      key={skill.trim()}
                      className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-600">
                  ✓ No missing skills identified.
                </p>
              )}
            </div>
          </div>

          {/* SECTIONS FOUND */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Resume Sections
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {analysisResult.sectionsFound.split(",").map((section) => (
                <span
                  key={section.trim()}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {section.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* AI SUGGESTIONS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              AI Suggestions
            </h3>

            <div className="mt-4 space-y-3">
              {analysisResult.suggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-3">
                  <span className="mt-1 text-indigo-600">•</span>

                  <p className="text-sm leading-6 text-slate-600">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* ANALYSIS DATE */}

          <div className="text-right">
            <p className="text-xs text-slate-400">
              Analyzed on {new Date(analysisResult.analyzedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* INFORMATION */}
      {/* ================================================= */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex gap-3">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

          <div>
            <p className="text-sm font-medium text-slate-700">
              Resume requirements
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Upload a clear and up-to-date resume. Your resume will be used for
              AI analysis and job matching.
            </p>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100">
              <Trash2 className="h-5 w-5 text-rose-600" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delete Resume?
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-700">
                {resumeDetails?.originalFileName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete Resume"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAnalysisHistory } from "../../services/analysisService";

import type { AnalysisHistoryResponse } from "../../types/analysis";

function AnalysisHistoryPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<AnalysisHistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  /**
   * Load analysis history whenever page changes.
   */
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAnalysisHistory(page, pageSize);

        setHistory(response.content || []);
        setTotalPages(response.totalPages || 0);
      } catch (err) {
        console.error("Failed to load analysis history:", err);

        setError("Failed to load analysis history.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [page]);

  /**
   * Navigate to analysis details.
   */
  const handleViewAnalysis = (analysisId: number) => {
    navigate(`/analysis/${analysisId}`);
  };

  /**
   * Loading state.
   */
  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Error state.
   */
  if (error) {
    return (
      <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Analysis History
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View your previous resume analyses
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-red-900">
                  Unable to load analysis history
                </h2>

                <p className="mt-1 text-sm text-red-700">{error}</p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Analysis History
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View and review your previous resume analyses
            </p>
          </div>

          {history.length > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {history.length === 1
                ? "1 Analysis"
                : `${history.length} Analyses`}
            </div>
          )}
        </div>

        {/* ================= EMPTY STATE ================= */}

        {history.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <svg
                className="h-8 w-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M14 3v5h5"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              No Analysis Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Analyze a resume to see your analysis history here.
            </p>

            <button
              onClick={() => navigate("/resume")}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Analyze Resume
            </button>
          </div>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}

            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Resume
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        ATS Score
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Words
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Analyzed At
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {history.map((item) => (
                      <tr
                        key={item.analysisId}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Resume */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                              <svg
                                className="h-5 w-5 text-slate-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.8}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                                />

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.8}
                                  d="M14 3v5h5"
                                />
                              </svg>
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {item.extractedName || "Resume Analysis"}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Analysis #{item.analysisId}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ATS Score */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900">
                              {item.atsScore}
                            </span>

                            <span className="text-xs text-slate-400">/100</span>
                          </div>
                        </td>

                        {/* Word Count */}

                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-slate-700">
                            {item.wordCount}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            {item.analysisStatus}
                          </span>
                        </td>

                        {/* Date */}

                        <td className="px-6 py-5">
                          <span className="whitespace-nowrap text-sm text-slate-600">
                            {new Date(item.analyzedAt).toLocaleString()}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => handleViewAnalysis(item.analysisId)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                          >
                            View Analysis
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}

            <div className="space-y-4 md:hidden">
              {history.map((item) => (
                <div
                  key={item.analysisId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {/* Card Header */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <svg
                          className="h-5 w-5 text-slate-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M14 3v5h5"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {item.extractedName || "Resume Analysis"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Analysis #{item.analysisId}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {item.analysisStatus}
                    </span>
                  </div>

                  {/* Card Stats */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        ATS Score
                      </p>

                      <p className="mt-1">
                        <span className="text-xl font-bold text-slate-900">
                          {item.atsScore}
                        </span>

                        <span className="ml-1 text-xs text-slate-400">
                          /100
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Word Count
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {item.wordCount}
                      </p>
                    </div>
                  </div>

                  {/* Date */}

                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-500">
                      Analyzed At
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {new Date(item.analyzedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Action */}

                  <button
                    onClick={() => handleViewAnalysis(item.analysisId)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Analysis
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-900">
                    {page + 1}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage((previous) => previous - 1)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((previous) => previous + 1)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AnalysisHistoryPage;

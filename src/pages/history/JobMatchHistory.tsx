import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getJobMatchHistory,
} from "../../services/jobMatchingService";

import type {
    JobMatchHistoryResponse,
} from "../../types/jobMatching";

function JobMatchHistory() {

    const navigate = useNavigate();

    const [jobMatches, setJobMatches] = useState<JobMatchHistoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 10;

    useEffect(() => {
        loadJobMatchHistory();
    }, [page]);

    const loadJobMatchHistory = async () => {

        try {

            setIsLoading(true);
            setErrorMessage("");

            const response = await getJobMatchHistory(page, size);

            setJobMatches(response.content);
            setTotalPages(response.totalPages);

        } catch (error) {

            console.error(
                "Failed to load job match history:",
                error
            );

            setErrorMessage(
                "Failed to load job match history. Please try again."
            );

        } finally {

            setIsLoading(false);

        }
    };

    const handleViewMatch = (jobMatchId: number) => {

        navigate(`/job-matching/${jobMatchId}`);

    };

    return (
        <div className="mx-auto max-w-6xl">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Job Match History
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View and review your previous resume and job matches.
                </p>

            </div>


            {/* ERROR */}

            {errorMessage && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {errorMessage}
                </div>
            )}


            {/* LOADING */}

            {isLoading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                    <p className="text-sm text-slate-500">
                        Loading job match history...
                    </p>

                </div>
            )}


            {/* EMPTY */}

            {!isLoading && jobMatches.length === 0 && !errorMessage && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                    <p className="text-sm font-medium text-slate-700">
                        No job matches found.
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Match your resume with a job description to see your
                        results here.
                    </p>

                </div>
            )}


            {/* HISTORY TABLE */}

            {!isLoading && jobMatches.length > 0 && (

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* TABLE HEADER */}

                    <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">

                        <div className="col-span-3">
                            Job Match
                        </div>

                        <div className="col-span-2">
                            Resume
                        </div>

                        <div className="col-span-2">
                            Match Score
                        </div>

                        <div className="col-span-2">
                            Status
                        </div>

                        <div className="col-span-2">
                            Matched At
                        </div>

                        <div className="col-span-1 text-right">
                            Action
                        </div>

                    </div>


                    {/* ROWS */}

                    {jobMatches.map((jobMatch) => (

                        <div
                            key={jobMatch.jobMatchId}
                            className="grid grid-cols-12 items-center border-b border-slate-100 px-6 py-5 last:border-b-0"
                        >

                            {/* JOB MATCH */}

                            <div className="col-span-3">

                                <p className="text-sm font-semibold text-slate-900">
                                    Job Match #{jobMatch.jobMatchId}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    User #{jobMatch.userId}
                                </p>

                            </div>


                            {/* RESUME */}

                            <div className="col-span-2">

                                <p className="text-sm text-slate-700">
                                    Resume #{jobMatch.resumeId}
                                </p>

                            </div>


                            {/* SCORE */}

                            <div className="col-span-2">

                                <span className="text-lg font-bold text-indigo-600">
                                    {jobMatch.matchScore}
                                </span>

                                <span className="ml-1 text-xs text-slate-400">
                                    /100
                                </span>

                            </div>


                            {/* STATUS */}

                            <div className="col-span-2">

                                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                    {jobMatch.matchStatus}
                                </span>

                            </div>


                            {/* DATE */}

                            <div className="col-span-2">

                                <p className="text-sm text-slate-600">
                                    {new Date(
                                        jobMatch.matchedAt
                                    ).toLocaleString()}
                                </p>

                            </div>


                            {/* ACTION */}

                            <div className="col-span-1 text-right">

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleViewMatch(
                                            jobMatch.jobMatchId
                                        )
                                    }
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                >
                                    View
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* PAGINATION */}

            {!isLoading && totalPages > 1 && (

                <div className="mt-6 flex items-center justify-between">

                    <button
                        type="button"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <p className="text-sm text-slate-500">
                        Page {page + 1} of {totalPages}
                    </p>

                    <button
                        type="button"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(page + 1)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
}

export default JobMatchHistory;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

import { getAnalysisDetails } from "../../services/analysisService";
import type { AnalysisResponse } from "../../types/analysis";

function AnalysisDetailsPage() {
    const { analysisId } = useParams();
    const navigate = useNavigate();

    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAnalysis = async () => {
            if (!analysisId) {
                setError("Analysis ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await getAnalysisDetails(
                    Number(analysisId)
                );

                setAnalysis(response);
            } catch (error) {
                console.error("Failed to load analysis:", error);
                setError("Failed to load analysis details.");
            } finally {
                setLoading(false);
            }
        };

        loadAnalysis();
    }, [analysisId]);

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold text-slate-900">
                    Analysis Details
                </h1>

                <p className="mt-4 text-sm text-slate-500">
                    Loading analysis...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-5xl">
                <button
                    type="button"
                    onClick={() => navigate("/history/analysis")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-indigo-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Analysis History
                </button>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-600">
                    {error}
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="mx-auto max-w-5xl">
                <p className="text-sm text-slate-500">
                    No analysis found.
                </p>
            </div>
        );
    }

    const skills = analysis.extractedSkills
        ? analysis.extractedSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [];

    const missingSkills = analysis.missingSkills
        ? analysis.missingSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [];

    const sections = analysis.sectionsFound
        ? analysis.sectionsFound
              .split(",")
              .map((section) => section.trim())
              .filter(Boolean)
        : [];

    return (
        <div className="mx-auto max-w-5xl">

            {/* HEADER */}

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <button
                        type="button"
                        onClick={() => navigate("/history/analysis")}
                        className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Analysis History
                    </button>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Resume Analysis
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Detailed analysis of your resume.
                    </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {analysis.analysisStatus}
                </span>

            </div>


            {/* ATS SCORE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col items-center justify-center">

                    <p className="text-sm font-medium text-slate-500">
                        ATS Score
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                        <span className="text-6xl font-bold text-indigo-600">
                            {analysis.atsScore}
                        </span>

                        <span className="mb-2 text-sm text-slate-400">
                            /100
                        </span>
                    </div>

                    <div className="mt-5 h-3 w-full max-w-xl overflow-hidden rounded-full bg-slate-100">

                        <div
                            className="h-full rounded-full bg-indigo-600 transition-all"
                            style={{
                                width: `${analysis.atsScore}%`,
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* CANDIDATE INFORMATION */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                    Candidate Information
                </h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <p className="text-xs text-slate-400">
                            Name
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {analysis.extractedName || "Not detected"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Email
                        </p>

                        <p className="mt-1 break-all text-sm font-medium text-slate-700">
                            {analysis.extractedEmail || "Not detected"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Mobile
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {analysis.extractedMobile || "Not detected"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Word Count
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {analysis.wordCount}
                        </p>
                    </div>

                </div>

            </div>


            {/* SKILLS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                    Skills Found
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">

                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">
                            No skills detected.
                        </p>
                    )}

                </div>

            </div>


            {/* MISSING SKILLS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                    Missing Skills
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">

                    {missingSkills.length > 0 ? (
                        missingSkills.map((skill) => (
                            <span
                                key={skill}
                                className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600"
                            >
                                <AlertCircle className="h-3.5 w-3.5" />
                                {skill}
                            </span>
                        ))
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                            No missing skills identified.
                        </div>
                    )}

                </div>

            </div>


            {/* SECTIONS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                    Resume Sections
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">

                    {sections.length > 0 ? (
                        sections.map((section) => (
                            <span
                                key={section}
                                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                            >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                {section}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">
                            No sections detected.
                        </p>
                    )}

                </div>

            </div>


            {/* AI SUGGESTIONS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-2">

                    <Lightbulb className="h-5 w-5 text-indigo-600" />

                    <h2 className="text-lg font-semibold text-slate-900">
                        AI Suggestions
                    </h2>

                </div>

                <div className="mt-5 space-y-3">

                    {analysis.suggestions?.length > 0 ? (
                        analysis.suggestions.map(
                            (suggestion, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                >
                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                            <Lightbulb className="h-4 w-4 text-indigo-600" />
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {suggestion}
                                        </p>

                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <p className="text-sm text-slate-500">
                            No suggestions available.
                        </p>
                    )}

                </div>

            </div>


            {/* ANALYSIS INFORMATION */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">

                <div className="grid gap-4 sm:grid-cols-3">

                    <div>
                        <p className="text-xs text-slate-400">
                            Analysis ID
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            #{analysis.analysisId}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Status
                        </p>

                        <p className="mt-1 text-sm font-medium text-emerald-600">
                            {analysis.analysisStatus}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Analyzed At
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {new Date(
                                analysis.analyzedAt
                            ).toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AnalysisDetailsPage;
import { useEffect, useState } from "react";
import {
    getAnalysisHistory,
    getAnalysisDetails,
} from "../../services/analysisService";

import type {
    AnalysisResponse,
} from "../../types/analysis";

function AnalysisPage() {

    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const loadLatestAnalysis = async () => {

            try {
                setLoading(true);
                setError(null);

                // 1. Get latest analysis from history
                const history = await getAnalysisHistory(0, 1);

                // 2. Check whether analysis exists
                if (
                    !history.content ||
                    history.content.length === 0
                ) {
                    setAnalysis(null);
                    return;
                }

                // 3. Get latest analysis ID
                const latestAnalysisId =
                    history.content[0].analysisId;

                // 4. Get complete analysis details
                const analysisDetails =
                    await getAnalysisDetails(latestAnalysisId);

                // 5. Store analysis
                setAnalysis(analysisDetails);

            } catch (err) {

                console.error(
                    "Failed to load analysis:",
                    err
                );

                setError(
                    "Failed to load resume analysis."
                );

            } finally {
                setLoading(false);
            }
        };

        loadLatestAnalysis();

    }, []);


    if (loading) {
        return (
            <div>
                <h1>Resume Analysis</h1>
                <p>Loading analysis...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div>
                <h1>Resume Analysis</h1>
                <p>{error}</p>
            </div>
        );
    }


    if (!analysis) {
        return (
            <div>
                <h1>Resume Analysis</h1>
                <p>No resume analysis found.</p>
            </div>
        );
    }

 return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

        {/* Page Header */}
        <div className="mx-auto max-w-7xl">

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Resume Analysis
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Review your resume performance and get AI-powered
                    recommendations.
                </p>
            </div>


            {/* ATS Score + Candidate Information */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* ATS Score */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        ATS Score
                    </p>

                    <div className="mt-6 flex items-center justify-center">

                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-blue-100">

                            <div className="text-center">
                                <p className="text-5xl font-bold text-blue-600">
                                    {analysis.atsScore}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    out of 100
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-6 text-center">

                        <p className="font-semibold text-slate-900">
                            {analysis.atsScore >= 80
                                ? "Excellent Score"
                                : analysis.atsScore >= 60
                                    ? "Good Score"
                                    : "Needs Improvement"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Based on your resume analysis
                        </p>

                    </div>

                </div>


                {/* Candidate Information */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Candidate Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Information extracted from your resume.
                        </p>
                    </div>


                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Name
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {analysis.extractedName}
                            </p>
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Email
                            </p>

                            <p className="mt-1 break-all font-medium text-slate-900">
                                {analysis.extractedEmail}
                            </p>
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Mobile
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {analysis.extractedMobile}
                            </p>
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Word Count
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {analysis.wordCount}
                            </p>
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Status
                            </p>

                            <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                {analysis.analysisStatus}
                            </span>
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Analyzed At
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {new Date(
                                    analysis.analyzedAt
                                ).toLocaleString()}
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* Skills */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Skills
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Skills identified from your resume.
                    </p>
                </div>


                <div className="flex flex-wrap gap-2">

                    {analysis.extractedSkills
                        .split(",")
                        .map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                            >
                                {skill.trim()}
                            </span>
                        ))}

                </div>

            </div>


            {/* Missing Skills */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Missing Skills
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Skills that could improve your resume.
                    </p>
                </div>


                <div className="flex flex-wrap gap-2">

                    {analysis.missingSkills
                        .split(",")
                        .map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                            >
                                {skill.trim()}
                            </span>
                        ))}

                </div>

            </div>


            {/* Sections Found */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Resume Sections
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Sections detected in your resume.
                    </p>
                </div>


                <div className="flex flex-wrap gap-2">

                    {analysis.sectionsFound
                        .split(",")
                        .map((section, index) => (
                            <span
                                key={index}
                                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                            >
                                {section.trim()}
                            </span>
                        ))}

                </div>

            </div>


            {/* AI Suggestions */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <div className="flex items-center gap-2">

                        <span className="text-xl">
                            ✨
                        </span>

                        <h2 className="text-lg font-semibold text-slate-900">
                            AI Suggestions
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Personalized recommendations to improve your resume.
                    </p>
                </div>


                <div className="space-y-3">

                    {analysis.suggestions.map(
                        (suggestion, index) => (

                            <div
                                key={index}
                                className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                            >

                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                    {index + 1}
                                </div>

                                <p className="text-sm leading-6 text-slate-700">
                                    {suggestion}
                                </p>

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* Footer */}
            <div className="py-8 text-center">

                <p className="text-xs text-slate-400">
                    Analysis ID: {analysis.analysisId}
                </p>

            </div>

        </div>

    </div>
);
}

export default AnalysisPage;    
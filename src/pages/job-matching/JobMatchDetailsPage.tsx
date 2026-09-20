import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Lightbulb,
    Target,
    XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

import { getJobMatchDetails } from "../../services/jobMatchingService";
import type { JobMatchDetailResponse } from "../../types/jobMatching";

function JobMatchDetailsPage() {

    const navigate = useNavigate();
    const { jobMatchId } = useParams();

    const [jobMatch, setJobMatch] =
        useState<JobMatchDetailResponse | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {

        if (jobMatchId) {
            loadJobMatchDetails(Number(jobMatchId));
        }

    }, [jobMatchId]);


    const loadJobMatchDetails = async (id: number) => {

        try {

            setIsLoading(true);

            const response =
                await getJobMatchDetails(id);

            setJobMatch(response);

        } catch (error) {

            console.error(
                "Failed to load job match details:",
                error
            );

            setJobMatch(null);

        } finally {

            setIsLoading(false);

        }
    };


    /*
     * Matching skills
     *
     * Backend returns:
     *
     * Java, Spring Boot, React
     */
    const matchingSkills =
        jobMatch?.matchingSkills
            ? jobMatch.matchingSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [];


    /*
     * Missing skills
     *
     * Backend returns:
     *
     * AWS, Docker, PostgreSQL
     */
    const missingSkills =
        jobMatch?.missingSkills
            ? jobMatch.missingSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [];


    /*
     * Suggestions
     *
     * IMPORTANT:
     *
     * Suggestions contain commas inside a single recommendation.
     *
     * Example:
     *
     * Add AWS cloud deployment experience by hosting
     * a project on AWS (e.g., EC2, RDS, S3).
     *
     * Therefore we MUST NOT use:
     *
     * suggestions.split(",")
     *
     * Instead, split only when a recommendation ends
     * with a period followed by another recommendation.
     */
    const suggestions =
        jobMatch?.suggestions
            ? jobMatch.suggestions
                .split(/(?<=\.),\s*/)
                .map((suggestion) => suggestion.trim())
                .filter(Boolean)
            : [];


    /*
     * Match badge
     */
    const getMatchBadge = () => {

        if (!jobMatch) {
            return "No Match";
        }

        if (jobMatch.matchScore >= 80) {
            return "Strong Match";
        }

        if (jobMatch.matchScore >= 60) {
            return "Good Match";
        }

        return "Needs Improvement";
    };


    /*
     * Loading state
     */
    if (isLoading) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Job Match Details
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Loading job match details...
                    </p>
                </div>

                <Card>

                    <div className="flex items-center justify-center py-16">

                        <p className="text-sm text-slate-500">
                            Loading...
                        </p>

                    </div>

                </Card>

            </div>
        );
    }


    /*
     * No data
     */
    if (!jobMatch) {

        return (
            <div className="space-y-6">

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/job-matching")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <Card>

                    <div className="py-12 text-center">

                        <Target className="mx-auto h-10 w-10 text-slate-300" />

                        <h2 className="mt-4 font-semibold text-slate-900">
                            Job match not found
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            The requested job match could not be loaded.
                        </p>

                    </div>

                </Card>

            </div>
        );
    }


    return (
        <div className="space-y-8">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div>

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/job-matching")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Job Matching
                </Button>

                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">

                                <Target className="h-5 w-5 text-emerald-600" />

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Job Match Details
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Detailed comparison between your resume and the job description.
                                </p>

                            </div>

                        </div>

                    </div>


                    <Badge variant="success">
                        {getMatchBadge()}
                    </Badge>

                </div>

            </div>


            {/* ================================================= */}
            {/* JOB DESCRIPTION */}
            {/* ================================================= */}

            <Card>

                <div className="flex items-center gap-2">

                    <Target className="h-5 w-5 text-emerald-600" />

                    <h2 className="font-semibold text-slate-900">
                        Job Description
                    </h2>

                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-5">

                    <p className="text-sm leading-6 text-slate-700">
                        {jobMatch.jobDescription}
                    </p>

                </div>

            </Card>


            {/* ================================================= */}
            {/* MATCH SCORE */}
            {/* ================================================= */}

            <Card>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <p className="text-sm font-medium text-slate-500">
                            Match Score
                        </p>

                        <div className="mt-2 flex items-end gap-3">

                            <span className="text-5xl font-bold tracking-tight text-slate-900">
                                {jobMatch.matchScore}%
                            </span>

                            <span className="mb-2 text-sm font-medium text-emerald-600">
                                {getMatchBadge()}
                            </span>

                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                            Based on your resume compared with this job description.
                        </p>

                    </div>


                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-100">

                        <span className="text-xl font-bold text-emerald-600">
                            {jobMatch.matchScore}
                        </span>

                    </div>

                </div>


                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                        style={{
                            width: `${jobMatch.matchScore}%`,
                        }}
                    />

                </div>

            </Card>


            {/* ================================================= */}
            {/* MATCHING + MISSING SKILLS */}
            {/* ================================================= */}

            <div className="grid gap-6 md:grid-cols-2">

                {/* Matching Skills */}

                <Card>

                    <div className="flex items-center gap-2">

                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                        <h2 className="font-semibold text-slate-900">
                            Matching Skills
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Skills found in your resume that match the job.
                    </p>


                    <div className="mt-5 flex flex-wrap gap-2">

                        {matchingSkills.length > 0 ? (

                            matchingSkills.map((skill) => (

                                <span
                                    key={skill}
                                    className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                                >
                                    {skill}
                                </span>

                            ))

                        ) : (

                            <p className="text-sm text-slate-400">
                                No matching skills available.
                            </p>

                        )}

                    </div>

                </Card>


                {/* Missing Skills */}

                <Card>

                    <div className="flex items-center gap-2">

                        <XCircle className="h-5 w-5 text-rose-500" />

                        <h2 className="font-semibold text-slate-900">
                            Missing Skills
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Skills required by the job that were not found in your resume.
                    </p>


                    <div className="mt-5 flex flex-wrap gap-2">

                        {missingSkills.length > 0 ? (

                            missingSkills.map((skill) => (

                                <span
                                    key={skill}
                                    className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
                                >
                                    {skill}
                                </span>

                            ))

                        ) : (

                            <p className="text-sm text-slate-400">
                                No missing skills.
                            </p>

                        )}

                    </div>

                </Card>

            </div>


            {/* ================================================= */}
            {/* AI SUGGESTIONS */}
            {/* ================================================= */}

            <Card>

                <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">

                        <Lightbulb className="h-5 w-5 text-amber-500" />

                    </div>

                    <div>

                        <h2 className="font-semibold text-slate-900">
                            AI Suggestions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Recommendations based on the job description.
                        </p>

                    </div>

                </div>


                <div className="mt-6 space-y-3">

                    {suggestions.length > 0 ? (

                        suggestions.map((suggestion, index) => (

                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3"
                            >

                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">

                                    <span className="text-xs font-semibold text-amber-700">
                                        {index + 1}
                                    </span>

                                </div>

                                <p className="text-sm leading-6 text-amber-800">
                                    {suggestion}
                                </p>

                            </div>

                        ))

                    ) : (

                        <p className="text-sm text-slate-400">
                            No suggestions available.
                        </p>

                    )}

                </div>

            </Card>


            {/* ================================================= */}
            {/* MATCH INFORMATION */}
            {/* ================================================= */}

            <Card>

                <h2 className="font-semibold text-slate-900">
                    Match Information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                            Match ID
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            #{jobMatch.jobMatchId}
                        </p>

                    </div>


                    <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                            Resume ID
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            #{jobMatch.resumeId}
                        </p>

                    </div>


                    <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                            Status
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {jobMatch.matchStatus}
                        </p>

                    </div>


                    <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                            Matched At
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {new Date(
                                jobMatch.matchedAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

            </Card>

        </div>
    );
}

export default JobMatchDetailsPage;
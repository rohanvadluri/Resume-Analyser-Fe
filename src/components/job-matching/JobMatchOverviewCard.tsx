import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Target,
    XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

import {
    getJobMatchHistory,
    getJobMatchDetails,
} from "../../services/jobMatchingService";

import type { JobMatchDetailResponse } from "../../types/jobMatching";

function JobMatchOverviewCard() {

    const navigate = useNavigate();

    const [jobMatch, setJobMatch] =
        useState<JobMatchDetailResponse | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);


    useEffect(() => {

        loadLatestJobMatch();

    }, []);


    const loadLatestJobMatch = async () => {

        try {

            setIsLoading(true);

            /*
             * Get latest job match from history
             */
            const historyResponse =
                await getJobMatchHistory(0, 1);


            if (
                historyResponse.content &&
                historyResponse.content.length > 0
            ) {

                const latestMatch =
                    historyResponse.content[0];


                /*
                 * Get complete details using jobMatchId
                 */
                const detailResponse =
                    await getJobMatchDetails(
                        latestMatch.jobMatchId
                    );


                setJobMatch(detailResponse);

            } else {

                setJobMatch(null);

            }

        } catch (error) {

            console.error(
                "Failed to load job match:",
                error
            );

            setJobMatch(null);

        } finally {

            setIsLoading(false);

        }
    };


    /*
     * Convert matching skills from
     * comma-separated string to array.
     *
     * Example:
     * "Java, Spring Boot, React"
     *
     * becomes:
     * ["Java", "Spring Boot", "React"]
     */
    const matchingSkills =
        jobMatch?.matchingSkills
            ? jobMatch.matchingSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [];


    /*
     * Convert missing skills from
     * comma-separated string to array.
     */
    const missingSkills =
        jobMatch?.missingSkills
            ? jobMatch.missingSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [];


    /*
     * Get badge text based on match score.
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
     * Get badge variant based on match score.
     */
    const getMatchBadgeVariant = () => {

        if (!jobMatch) {
            return "info";
        }

        if (jobMatch.matchScore >= 80) {
            return "success";
        }

        if (jobMatch.matchScore >= 60) {
            return "info";
        }

        return "warning";
    };


    /*
     * Job description from API.
     */
    const jobDescription =
        jobMatch?.jobDescription ?? "";


    return (
        <Card>

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">

                        <Target className="h-5 w-5 text-emerald-600" />

                    </div>

                    <div>

                        <h2 className="font-semibold text-slate-900">
                            Latest Job Match
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Resume vs Job Description
                        </p>

                    </div>

                </div>


                <Badge
                    variant={
                        isLoading
                            ? "info"
                            : getMatchBadgeVariant()
                    }
                >

                    {isLoading
                        ? "Loading"
                        : getMatchBadge()}

                </Badge>

            </div>


            {/* ================================================= */}
            {/* JOB DESCRIPTION */}
            {/* ================================================= */}

            <div className="mt-6">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Job Description
                </p>

                <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">

                    {isLoading
                        ? "Loading..."
                        : jobDescription ||
                          "No job description available"}

                </h3>

            </div>


            {/* ================================================= */}
            {/* SCORE */}
            {/* ================================================= */}

            <div className="mt-6 rounded-xl bg-slate-50 p-5">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-medium text-slate-500">
                            Match Score
                        </p>

                        <div className="mt-1 flex items-end gap-2">

                            <span className="text-3xl font-bold tracking-tight text-slate-900">

                                {isLoading
                                    ? "..."
                                    : `${jobMatch?.matchScore ?? 0}%`}

                            </span>


                            {!isLoading && jobMatch && (

                                <span className="mb-1 text-sm font-medium text-slate-500">

                                    {getMatchBadge()}

                                </span>

                            )}

                        </div>

                    </div>


                    {/* Score indicator */}

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-emerald-100">

                        <span className="text-xs font-bold text-emerald-600">

                            {isLoading
                                ? "..."
                                : jobMatch?.matchScore ?? 0}

                        </span>

                    </div>

                </div>


                {/* Progress */}

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                        style={{
                            width: `${jobMatch?.matchScore ?? 0}%`,
                        }}
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* MATCHING SKILLS */}
            {/* ================================================= */}

            <div className="mt-6">

                <div className="flex items-center gap-2">

                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                    <h3 className="text-sm font-semibold text-slate-900">
                        Matching Skills
                    </h3>

                </div>


                <div className="mt-3 flex flex-wrap gap-2">

                    {matchingSkills.length > 0 ? (

                        matchingSkills.map((skill) => (

                            <span
                                key={skill}
                                className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700"
                            >
                                {skill}
                            </span>

                        ))

                    ) : (

                        <span className="text-xs text-slate-400">
                            No matching skills available
                        </span>

                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* MISSING SKILLS */}
            {/* ================================================= */}

            <div className="mt-5">

                <div className="flex items-center gap-2">

                    <XCircle className="h-4 w-4 text-rose-500" />

                    <h3 className="text-sm font-semibold text-slate-900">
                        Missing Skills
                    </h3>

                </div>


                <div className="mt-3 flex flex-wrap gap-2">

                    {missingSkills.length > 0 ? (

                        missingSkills.map((skill) => (

                            <span
                                key={skill}
                                className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700"
                            >
                                {skill}
                            </span>

                        ))

                    ) : (

                        <span className="text-xs text-slate-400">
                            No missing skills available
                        </span>

                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* ACTION */}
            {/* ================================================= */}

            <div className="mt-6 flex justify-end">

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={!jobMatch}
                    onClick={() => {

                        if (!jobMatch) {
                            return;
                        }

                        navigate(
                            `/job-matching/${jobMatch.jobMatchId}`
                        );

                    }}
                >
                    View Full Match →
                </Button>

            </div>

        </Card>
    );
}

export default JobMatchOverviewCard;
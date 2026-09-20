import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Lightbulb,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import Card from "../ui/Card";

import {
    getJobMatchHistory,
    getJobMatchDetails,
} from "../../services/jobMatchingService";

import type { JobMatchDetailResponse } from "../../types/jobMatching";

function AIInsightsCard() {

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
             * Get latest job match
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
                 * Get complete details
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
                "Failed to load AI insights:",
                error
            );

            setJobMatch(null);

        } finally {

            setIsLoading(false);

        }
    };


    /*
     * Convert matching skills
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
     * Convert missing skills
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
     * Backend currently returns suggestions as one string.
     *
     * We split them using ".," instead of every comma,
     * so things like:
     *
     * EC2, RDS, S3
     *
     * stay together.
     */
    const recommendations =
        jobMatch?.suggestions
            ? jobMatch.suggestions
                .split(/(?<=\.),\s*/)
                .map((suggestion) => suggestion.trim())
                .filter(Boolean)
            : [];


    /*
     * Overall assessment
     */
    const getOverallAssessment = () => {

        if (!jobMatch) {
            return "No job match analysis is available yet.";
        }

        return `Your resume currently has a ${jobMatch.matchScore}% match with this job description. Focus on the missing skills and recommendations to improve your alignment.`;
    };


    return (
        <Card className="lg:col-span-2">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">

                    <Sparkles className="h-5 w-5 text-violet-600" />

                </div>


                <div>

                    <h2 className="font-semibold text-slate-900">
                        AI Resume Insights
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                        Personalized insights from your latest analysis.
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* OVERALL ASSESSMENT */}
            {/* ================================================= */}

            <div className="mt-6 rounded-xl border border-violet-100 bg-violet-50/60 p-5">

                <div className="flex items-center gap-2">

                    <TrendingUp className="h-4 w-4 text-violet-600" />

                    <p className="text-sm font-semibold text-violet-900">
                        Overall Assessment
                    </p>

                </div>


                <p className="mt-2 text-sm leading-6 text-violet-800">

                    {isLoading
                        ? "Loading your latest insights..."
                        : getOverallAssessment()}

                </p>

            </div>


            {/* ================================================= */}
            {/* STRENGTHS + RECOMMENDATIONS */}
            {/* ================================================= */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">


                {/* ================================================= */}
                {/* STRENGTHS */}
                {/* ================================================= */}

                <div>

                    <div className="flex items-center gap-2">

                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                        <h3 className="text-sm font-semibold text-slate-900">
                            Your Strengths
                        </h3>

                    </div>


                    <div className="mt-3 space-y-2">

                        {isLoading ? (

                            <p className="text-sm text-slate-400">
                                Loading strengths...
                            </p>

                        ) : matchingSkills.length > 0 ? (

                            matchingSkills.map((skill) => (

                                <div
                                    key={skill}
                                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5"
                                >

                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                                    <span className="text-sm font-medium text-emerald-800">
                                        {skill}
                                    </span>

                                </div>

                            ))

                        ) : (

                            <p className="text-sm text-slate-400">
                                No matching skills available.
                            </p>

                        )}

                    </div>

                </div>


                {/* ================================================= */}
                {/* RECOMMENDATIONS */}
                {/* ================================================= */}

                <div>

                    <div className="flex items-center gap-2">

                        <Lightbulb className="h-4 w-4 text-amber-500" />

                        <h3 className="text-sm font-semibold text-slate-900">
                            Recommendations
                        </h3>

                    </div>


                    <div className="mt-3 space-y-3">

                        {isLoading ? (

                            <p className="text-sm text-slate-400">
                                Loading recommendations...
                            </p>

                        ) : recommendations.length > 0 ? (

                            recommendations.map(
                                (recommendation, index) => (

                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded-lg bg-amber-50 px-3 py-3"
                                    >

                                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

                                        <p className="text-sm font-medium leading-6 text-amber-800">
                                            {recommendation}
                                        </p>

                                    </div>

                                )
                            )

                        ) : (

                            <p className="text-sm text-slate-400">
                                No recommendations available.
                            </p>

                        )}

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* MISSING SKILLS */}
            {/* ================================================= */}

            {missingSkills.length > 0 && (

                <div className="mt-6">

                    <div className="flex items-center gap-2">

                        <TrendingUp className="h-4 w-4 text-rose-500" />

                        <h3 className="text-sm font-semibold text-slate-900">
                            Skills to Improve
                        </h3>

                    </div>


                    <div className="mt-3 flex flex-wrap gap-2">

                        {missingSkills.map((skill) => (

                            <span
                                key={skill}
                                className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>

            )}

        </Card>
    );
}

export default AIInsightsCard;
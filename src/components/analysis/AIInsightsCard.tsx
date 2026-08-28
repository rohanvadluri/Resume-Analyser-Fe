import {
    CheckCircle2,
    Lightbulb,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import Card from "../ui/Card";

function AIInsightsCard() {

    const strengths = [
        "Java",
        "Spring Boot",
        "REST APIs",
        "PostgreSQL",
    ];

    const recommendations = [
        "Add Docker experience",
        "Highlight AWS projects",
        "Quantify project achievements",
    ];

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
                    Your resume demonstrates a strong technical foundation.
                    Your experience with backend development and modern
                    Java technologies gives you a solid starting point for
                    software engineering roles.
                </p>

            </div>


            {/* ================================================= */}
            {/* STRENGTHS + RECOMMENDATIONS */}
            {/* ================================================= */}

            <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* Strengths */}

                <div>

                    <div className="flex items-center gap-2">

                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                        <h3 className="text-sm font-semibold text-slate-900">
                            Your Strengths
                        </h3>

                    </div>

                    <div className="mt-3 space-y-2">

                        {strengths.map((skill) => (

                            <div
                                key={skill}
                                className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5"
                            >

                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                                <span className="text-sm font-medium text-emerald-800">
                                    {skill}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                {/* Recommendations */}

                <div>

                    <div className="flex items-center gap-2">

                        <Lightbulb className="h-4 w-4 text-amber-500" />

                        <h3 className="text-sm font-semibold text-slate-900">
                            Recommendations
                        </h3>

                    </div>

                    <div className="mt-3 space-y-2">

                        {recommendations.map((recommendation) => (

                            <div
                                key={recommendation}
                                className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5"
                            >

                                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

                                <span className="text-sm font-medium leading-5 text-amber-800">
                                    {recommendation}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </Card>
    );
}

export default AIInsightsCard;
import {
    CheckCircle2,
    Target,
    XCircle,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function JobMatchOverviewCard() {

    const matchScore = 92;

    const matchingSkills = [
        "Java",
        "Spring Boot",
        "REST APIs",
        "PostgreSQL",
    ];

    const missingSkills = [
        "Docker",
        "Jenkins",
    ];

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

                <Badge variant="success">
                    Strong Match
                </Badge>

            </div>


            {/* ================================================= */}
            {/* JOB TITLE */}
            {/* ================================================= */}

            <div className="mt-6">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Job Description
                </p>

                <h3 className="mt-1 text-base font-semibold text-slate-900">
                    Java Spring Boot Developer
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
                                {matchScore}%
                            </span>

                            <span className="mb-1 text-sm font-medium text-emerald-600">
                                Strong Match
                            </span>

                        </div>

                    </div>

                    {/* Score indicator */}

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-emerald-100">

                        <span className="text-xs font-bold text-emerald-600">
                            {matchScore}
                        </span>

                    </div>

                </div>

                {/* Progress */}

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                        style={{
                            width: `${matchScore}%`,
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

                    {matchingSkills.map((skill) => (

                        <span
                            key={skill}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700"
                        >
                            {skill}
                        </span>

                    ))}

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


            {/* ================================================= */}
            {/* ACTION */}
            {/* ================================================= */}

            <div className="mt-6 flex justify-end">

                <Button
                    variant="secondary"
                    size="sm"
                >
                    View Full Match →
                </Button>

            </div>

        </Card>
    );
}

export default JobMatchOverviewCard;
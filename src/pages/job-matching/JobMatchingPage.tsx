import { useEffect, useState } from "react";

import {
    matchResumeWithJobDescription,
} from "../../services/jobMatchingService";

import {
    getMyResume,
} from "../../services/resumeService";

import type {
    JobMatchResponse,
} from "../../types/jobMatching";

import type {
    ResumeResponse,
} from "../../types/resume";

import {
    BriefcaseBusiness,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Target,
    FileText,
    XCircle,
} from "lucide-react";


function JobMatchingPage() {

    const [jobDescription, setJobDescription] = useState("");

    const [resume, setResume] =
        useState<ResumeResponse | null>(null);

    const [matchResult, setMatchResult] =
        useState<JobMatchResponse | null>(null);

    const [isLoadingResume, setIsLoadingResume] =
        useState(true);

    const [isMatching, setIsMatching] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");


    /**
     * Load user's resume.
     */
    useEffect(() => {

        const loadResume = async () => {

            try {

                setIsLoadingResume(true);
                setErrorMessage("");

                const response = await getMyResume();

                setResume(response);

            } catch (error) {

                console.error(
                    "Failed to load resume:",
                    error
                );

                setResume(null);

                setErrorMessage(
                    "Please upload a resume before using Job Matching."
                );

            } finally {

                setIsLoadingResume(false);

            }
        };

        loadResume();

    }, []);


    /**
     * Match resume with job description.
     */
    const handleMatchResume = async () => {

        setErrorMessage("");
        setSuccessMessage("");
        setMatchResult(null);


        /**
         * Check resume.
         */
        if (!resume) {

            setErrorMessage(
                "Please upload a resume before matching."
            );

            return;
        }


        /**
         * Check job description.
         */
        if (!jobDescription.trim()) {

            setErrorMessage(
                "Please enter the job description."
            );

            return;
        }


        try {

            setIsMatching(true);


            const request = {
                resumeId: resume.resumeId,
                jobDescription: jobDescription.trim(),
            };


            const response =
                await matchResumeWithJobDescription(
                    request
                );


            setMatchResult(response);

            setSuccessMessage(
                "Resume matched successfully."
            );

        } catch (error) {

            console.error(
                "Job matching failed:",
                error
            );

            setErrorMessage(
                "Failed to match resume. Please try again."
            );

        } finally {

            setIsMatching(false);

        }
    };


    /**
     * Clear job description and result.
     */
    const handleClear = () => {

        setJobDescription("");

        setMatchResult(null);

        setErrorMessage("");

        setSuccessMessage("");

    };


    return (

        <div className="mx-auto max-w-5xl">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">

                        <BriefcaseBusiness
                            className="h-5 w-5 text-indigo-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Job Matching
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Compare your resume with a job description
                            using AI.
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR MESSAGE */}
            {/* ================================================= */}

            {errorMessage && (

                <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">

                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <span>
                        {errorMessage}
                    </span>

                </div>

            )}


            {/* ================================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================================= */}

            {successMessage && (

                <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                    <CheckCircle2 className="h-5 w-5 shrink-0" />

                    <span>
                        {successMessage}
                    </span>

                </div>

            )}


            {/* ================================================= */}
            {/* RESUME INFORMATION */}
            {/* ================================================= */}

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">

                        <FileText
                            className="h-5 w-5 text-indigo-600"
                        />

                    </div>


                    <div className="min-w-0 flex-1">

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Resume being analyzed
                        </p>

                        {isLoadingResume ? (

                            <p className="mt-1 text-sm text-slate-500">
                                Loading resume...
                            </p>

                        ) : resume ? (

                            <>

                                <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                                    {resume.originalFileName}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Resume ID: #{resume.resumeId}
                                </p>

                            </>

                        ) : (

                            <p className="mt-1 text-sm text-rose-600">
                                No resume uploaded
                            </p>

                        )}

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* JOB DESCRIPTION CARD */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">

                            <BriefcaseBusiness
                                className="h-5 w-5 text-indigo-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Job Description
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Paste the job description you want to
                                compare with your resume.
                            </p>

                        </div>

                    </div>

                </div>


                {/* JOB DESCRIPTION */}

                <div>

                    <label
                        htmlFor="job-description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Job Description
                    </label>


                    <textarea
                        id="job-description"
                        rows={14}
                        value={jobDescription}
                        onChange={(event) =>
                            setJobDescription(
                                event.target.value
                            )
                        }
                        placeholder="Paste the complete job description here...

Example:

We are looking for a Java Spring Boot Developer with experience in REST APIs, MySQL, AWS and Docker..."
                        disabled={
                            isMatching ||
                            isLoadingResume ||
                            !resume
                        }
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />


                    <div className="mt-2 flex items-center justify-between">

                        <span className="text-xs text-slate-400">
                            Paste the complete job description
                        </span>

                        <span className="text-xs text-slate-400">
                            {jobDescription.length} characters
                        </span>

                    </div>

                </div>


                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                    {/* CLEAR */}

                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={isMatching}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-32"
                    >
                        Clear
                    </button>


                    {/* MATCH */}

                    <button
                        type="button"
                        onClick={handleMatchResume}
                        disabled={
                            isMatching ||
                            isLoadingResume ||
                            !resume
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <Sparkles className="h-4 w-4" />

                        {isMatching
                            ? "Matching Resume..."
                            : "Match Resume"}

                    </button>

                </div>

            </div>


            {/* ================================================= */}
            {/* MATCH RESULT */}
            {/* ================================================= */}

            {matchResult && (

                <div className="mt-6 space-y-5">

                    {/* ================================================= */}
                    {/* RESULT HEADER */}
                    {/* ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <div className="flex items-center gap-2">

                                    <Sparkles
                                        className="h-5 w-5 text-indigo-600"
                                    />

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Job Match Result
                                    </h2>

                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    AI-powered comparison of your resume
                                    against the job description.
                                </p>

                            </div>


                            <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">

                                Analysis Complete

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* MATCH SCORE */}
                    {/* ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col items-center">

                            <div className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-100">

                                <div className="text-center">

                                    <p className="text-4xl font-bold text-indigo-600">
                                        {matchResult.matchScore}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        / 100
                                    </p>

                                </div>

                            </div>


                            <div className="mt-5 flex items-center gap-2">

                                <Target
                                    className="h-5 w-5 text-indigo-600"
                                />

                                <p className="text-sm font-semibold text-slate-800">
                                    Resume Match Score
                                </p>

                            </div>


                            <div className="mt-4 h-3 w-full max-w-xl overflow-hidden rounded-full bg-slate-100">

                                <div
                                    className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                                    style={{
                                        width: `${matchResult.matchScore}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* SKILLS GRID */}
                    {/* ================================================= */}

                    <div className="grid gap-5 lg:grid-cols-2">


                        {/* MATCHING SKILLS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    className="h-5 w-5 text-emerald-600"
                                />

                                <h3 className="text-sm font-semibold text-slate-900">
                                    Matching Skills
                                </h3>

                            </div>


                            <p className="mt-1 text-xs text-slate-400">
                                Skills found in both your resume and
                                the job description.
                            </p>


                            <div className="mt-4 flex flex-wrap gap-2">

                                {matchResult.matchingSkills &&
                                matchResult.matchingSkills.length > 0 ? (

                                    matchResult.matchingSkills.map(
                                        (skill, index) => (

                                            <span
                                                key={`${skill}-${index}`}
                                                className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <p className="text-sm text-slate-500">
                                        No matching skills found.
                                    </p>

                                )}

                            </div>

                        </div>


                        {/* MISSING SKILLS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-2">

                                <XCircle
                                    className="h-5 w-5 text-rose-600"
                                />

                                <h3 className="text-sm font-semibold text-slate-900">
                                    Missing Skills
                                </h3>

                            </div>


                            <p className="mt-1 text-xs text-slate-400">
                                Skills required by the job but not found
                                in your resume.
                            </p>


                            <div className="mt-4 flex flex-wrap gap-2">

                                {matchResult.missingSkills &&
                                matchResult.missingSkills.length > 0 ? (

                                    matchResult.missingSkills.map(
                                        (skill, index) => (

                                            <span
                                                key={`${skill}-${index}`}
                                                className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <p className="text-sm text-emerald-600">
                                        No missing skills identified.
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* AI SUGGESTIONS */}
                    {/* ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-2">

                            <Sparkles
                                className="h-5 w-5 text-indigo-600"
                            />

                            <h3 className="text-sm font-semibold text-slate-900">
                                AI Suggestions
                            </h3>

                        </div>


                        <p className="mt-1 text-xs text-slate-400">
                            Recommendations based on the job description
                            and your resume.
                        </p>


                        <div className="mt-5 space-y-3">

                            {matchResult.suggestions &&
                            matchResult.suggestions.length > 0 ? (

                                matchResult.suggestions.map(
                                    (suggestion, index) => (

                                        <div
                                            key={index}
                                            className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                                        >

                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">

                                                <Sparkles
                                                    className="h-4 w-4 text-indigo-600"
                                                />

                                            </div>


                                            <p className="text-sm leading-6 text-slate-600">
                                                {suggestion}
                                            </p>

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


                    {/* ================================================= */}
                    {/* JOB DESCRIPTION USED */}
                    {/* ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-2">

                            <BriefcaseBusiness
                                className="h-5 w-5 text-slate-500"
                            />

                            <h3 className="text-sm font-semibold text-slate-900">
                                Job Description Analyzed
                            </h3>

                        </div>


                        <div className="mt-4 rounded-xl bg-slate-50 p-4">

                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                {jobDescription}
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* ================================================= */}
            {/* INFORMATION CARD */}
            {/* ================================================= */}

            {!matchResult && (

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">

                            <Sparkles
                                className="h-5 w-5 text-indigo-600"
                            />

                        </div>


                        <div>

                            <p className="text-sm font-semibold text-slate-800">
                                How Job Matching Works
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Your uploaded resume is compared with
                                the job description using AI. The system
                                identifies matching skills, missing skills,
                                calculates a match score, and provides
                                suggestions to improve your resume.
                            </p>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


export default JobMatchingPage;
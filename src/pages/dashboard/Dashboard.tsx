import { useEffect, useState } from "react";
import { FileText, Sparkles, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ScoreRing from "../../components/analysis/ScoreRing";
import ResumeOverviewCard from "../../components/resume/ResumeOverviewCard";
import JobMatchOverviewCard from "../../components/job-matching/JobMatchOverviewCard";
import AIInsightsCard from "../../components/analysis/AIInsightsCard";

import { getMyResume } from "../../services/resumeService";
import { getAnalysisHistory } from "../../services/analysisService";
import { getJobMatchHistory } from "../../services/jobMatchingService";

import type { ResumeResponse } from "../../types/resume";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [resume, setResume] = useState<ResumeResponse | null>(null);

  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [jobMatchScore, setJobMatchScore] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  /*
   * Load Dashboard Data
   */
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      /*
       * Get current resume
       */
      const resumeResponse = await getMyResume();

      setResume(resumeResponse);

      /*
       * Get latest analysis
       */
      const analysisResponse = await getAnalysisHistory(0, 1);

      if (
        analysisResponse.content &&
        analysisResponse.content.length > 0
      ) {
        setAtsScore(
          analysisResponse.content[0].atsScore
        );
      } else {
        setAtsScore(null);
      }

      /*
       * Get latest job match
       */
      const jobMatchResponse = await getJobMatchHistory(0, 1);

      if (
        jobMatchResponse.content &&
        jobMatchResponse.content.length > 0
      ) {
        setJobMatchScore(
          jobMatchResponse.content[0].matchScore
        );
      } else {
        setJobMatchScore(null);
      }

    } catch (error) {
      console.error(
        "Failed to load dashboard data:",
        error
      );

      setResume(null);
      setAtsScore(null);
      setJobMatchScore(null);

    } finally {
      setIsLoading(false);
    }
  };

  /*
   * Load dashboard when page opens
   */
  useEffect(() => {
    loadDashboardData();
  }, []);

  /*
   * ATS score display
   */
  const displayedAtsScore =
    atsScore !== null
      ? atsScore
      : 0;

  /*
   * Job match score display
   */
  const displayedJobMatchScore =
    jobMatchScore !== null
      ? jobMatchScore
      : 0;

  /*
   * Job match badge
   */
  const getJobMatchBadge = () => {
    if (jobMatchScore === null) {
      return "No Match";
    }

    if (jobMatchScore >= 80) {
      return "Strong Match";
    }

    if (jobMatchScore >= 60) {
      return "Good Match";
    }

    return "Needs Improvement";
  };

  return (
    <div className="space-y-8">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {user?.firstName ?? "User"}. Here's your resume
          intelligence.
        </p>
      </div>


      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="grid gap-6 md:grid-cols-3">

        {/* ================================================= */}
        {/* CURRENT RESUME */}
        {/* ================================================= */}

        <Card>

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            <Badge variant="success">
              {isLoading
                ? "Loading"
                : resume?.resumeStatus ?? "No Resume"}
            </Badge>

          </div>


          <div className="mt-5">

            <p className="text-sm font-medium text-slate-500">
              Current Resume
            </p>

            <h2 className="mt-1 truncate text-base font-semibold text-slate-900">
              {isLoading
                ? "Loading resume..."
                : resume?.originalFileName ?? "No resume uploaded"}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {isLoading
                ? "Please wait..."
                : resume
                  ? `Uploaded on ${new Date(
                      resume.uploadDate
                    ).toLocaleDateString()}`
                  : "No resume uploaded"}
            </p>

          </div>

        </Card>


        {/* ================================================= */}
        {/* ATS SCORE */}
        {/* ================================================= */}

        <Card>

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
              <Sparkles className="h-5 w-5 text-violet-600" />
            </div>

            <Sparkles className="h-5 w-5 text-violet-500" />

          </div>


          <div className="mt-5">

            <p className="text-sm font-medium text-slate-500">
              ATS Score
            </p>

            <div className="mt-1 flex items-end gap-2">

              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {isLoading
                  ? "..."
                  : displayedAtsScore}
              </span>

              <span className="mb-1 text-sm text-slate-400">
                / 100
              </span>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Based on your latest analysis
            </p>

          </div>


          <div className="mt-4 flex justify-center">

            <ScoreRing
              score={displayedAtsScore}
            />

          </div>

        </Card>


        {/* ================================================= */}
        {/* LATEST JOB MATCH */}
        {/* ================================================= */}

        <Card>

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <Target className="h-5 w-5 text-emerald-600" />
            </div>

            <Badge variant="info">
              {isLoading
                ? "Loading"
                : getJobMatchBadge()}
            </Badge>

          </div>


          <div className="mt-5">

            <p className="text-sm font-medium text-slate-500">
              Latest Job Match
            </p>

            <div className="mt-1 flex items-end gap-2">

              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {isLoading
                  ? "..."
                  : `${displayedJobMatchScore}%`}
              </span>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Based on your latest job comparison
            </p>

          </div>

        </Card>

      </div>


      {/* ================================================= */}
      {/* RESUME OVERVIEW */}
      {/* ================================================= */}

      <div>
        <ResumeOverviewCard />
      </div>


      {/* ================================================= */}
      {/* JOB MATCH OVERVIEW */}
      {/* ================================================= */}

      <div>
        <JobMatchOverviewCard />
      </div>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ================================================= */}
        {/* AI INSIGHTS */}
        {/* ================================================= */}

        <AIInsightsCard />


        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        <Card>

          <div>

            <h2 className="font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your resume and analysis.
            </p>

          </div>


          <div className="mt-6 space-y-3">

            {/* Upload Resume */}

            <Button
              className="w-full"
              onClick={() => navigate("/resume")}
            >
              <FileText className="h-4 w-4" />
              Upload Resume
            </Button>


            {/* Analyze Resume */}

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate("/analysis")}
            >
              <Sparkles className="h-4 w-4" />
              Analyze Resume
            </Button>


            {/* Match Job */}

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate("/job-matching")}
            >
              <Target className="h-4 w-4" />
              Match Job
            </Button>

          </div>

        </Card>

      </div>

    </div>
  );
}

export default Dashboard;
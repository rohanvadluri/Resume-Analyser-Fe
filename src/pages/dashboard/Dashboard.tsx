import { useEffect, useState } from "react";
import { FileText, Sparkles, Target, ArrowUpRight } from "lucide-react";
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
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

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

      if (analysisResponse.content && analysisResponse.content.length > 0) {
        setAtsScore(analysisResponse.content[0].atsScore);
      } else {
        setAtsScore(null);
      }

      /*
       * Get latest job match
       */
      const jobMatchResponse = await getJobMatchHistory(0, 1);

      if (jobMatchResponse.content && jobMatchResponse.content.length > 0) {
        setJobMatchScore(jobMatchResponse.content[0].matchScore);
      } else {
        setJobMatchScore(null);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);

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
   * Show skeleton while dashboard data is loading
   */
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  /*
   * ATS score display
   */
  const displayedAtsScore = atsScore !== null ? atsScore : 0;

  /*
   * Job match score display
   */
  const displayedJobMatchScore =
    jobMatchScore !== null ? jobMatchScore : 0;

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
    <>
      {/* ================================================= */}
      {/* DASHBOARD ANIMATION STYLES */}
      {/* ================================================= */}

      <style>
        {`
          @keyframes dashboardFadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dashboardFade {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes dashboardFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-4px);
            }
          }

          @keyframes dashboardPulse {
            0%,
            100% {
              opacity: 0.45;
              transform: scale(1);
            }

            50% {
              opacity: 0.8;
              transform: scale(1.08);
            }
          }

          .dashboard-enter {
            animation: dashboardFade 0.5s ease-out both;
          }

          .dashboard-item {
            opacity: 0;
            animation: dashboardFadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .dashboard-float {
            animation: dashboardFloat 5s ease-in-out infinite;
          }

          .dashboard-pulse {
            animation: dashboardPulse 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .dashboard-enter,
            .dashboard-item,
            .dashboard-float,
            .dashboard-pulse {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
        `}
      </style>

      {/* ================================================= */}
      {/* MAIN DASHBOARD */}
      {/* ================================================= */}

      <div className="dashboard-enter space-y-8">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div
          className="dashboard-item"
          style={{ animationDelay: "0ms" }}
        >
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200/80
              bg-white
              px-6
              py-7
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-0.5
              hover:border-indigo-200
              hover:shadow-xl
              hover:shadow-indigo-100/30
            "
          >

            {/* Background glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-indigo-100/50
                blur-3xl
                transition-all
                duration-700
                group-hover:scale-125
                group-hover:bg-indigo-100/70
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-24
                left-1/3
                h-40
                w-40
                rounded-full
                bg-violet-100/40
                blur-3xl
                transition-all
                duration-700
                group-hover:translate-x-10
              "
            />

            <div className="relative">

              {/* Small status */}

              <div className="flex items-center gap-2">

                <span className="relative flex h-2.5 w-2.5">

                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-emerald-400
                      opacity-60
                    "
                  />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />

                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Resume Intelligence
                </span>

              </div>

              {/* Heading */}

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">

                Welcome back,{" "}

                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.firstName ?? "User"}
                </span>

                <span className="ml-1 inline-block transition-transform duration-300 group-hover:rotate-12">
                  👋
                </span>

              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Track your resume performance, job matches, and AI-powered
                recommendations all in one place.
              </p>

            </div>
          </div>
        </div>


        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="grid gap-5 md:grid-cols-3">

          {/* ================================================= */}
          {/* CURRENT RESUME */}
          {/* ================================================= */}

          <div
            className="dashboard-item"
            style={{ animationDelay: "100ms" }}
          >
            <Card
              className="
                group
                relative
                h-full
                overflow-hidden
                border-slate-200/80
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:border-indigo-200
                hover:shadow-xl
                hover:shadow-indigo-100/30
              "
            >

              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-indigo-100/60
                  opacity-0
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-50
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                      group-hover:bg-indigo-100
                    "
                  >
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>

                  <Badge variant="success">
                    {isLoading
                      ? "Loading"
                      : (resume?.resumeStatus ?? "No Resume")}
                  </Badge>

                </div>

                <div className="mt-5">

                  <p className="text-sm font-medium text-slate-500">
                    Current Resume
                  </p>

                  <h2
                    className="
                      mt-1
                      truncate
                      text-base
                      font-semibold
                      text-slate-900
                    "
                  >
                    {isLoading
                      ? "Loading resume..."
                      : (resume?.originalFileName ??
                        "No resume uploaded")}
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

                {/* Bottom accent */}

                <div
                  className="
                    mt-5
                  "
                />

              </div>
            </Card>
          </div>


          {/* ================================================= */}
          {/* ATS SCORE */}
          {/* ================================================= */}

          <div
            className="dashboard-item"
            style={{ animationDelay: "180ms" }}
          >
            <Card
              className="
                group
                relative
                h-full
                overflow-hidden
                border-slate-200/80
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:border-violet-200
                hover:shadow-xl
                hover:shadow-violet-100/30
              "
            >

              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-violet-100/70
                  opacity-0
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-50
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                      group-hover:bg-violet-100
                    "
                  >
                    <Sparkles className="h-5 w-5 text-violet-600" />
                  </div>

                  <Sparkles
                    className="
                      h-5
                      w-5
                      text-violet-400
                      transition-all
                      duration-500
                      group-hover:rotate-12
                      group-hover:scale-110
                    "
                  />

                </div>

                <div className="mt-5">

                  <p className="text-sm font-medium text-slate-500">
                    ATS Score
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <span className="text-3xl font-bold tracking-tight text-slate-900">
                      {isLoading ? "..." : displayedAtsScore}
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

                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <ScoreRing score={displayedAtsScore} />
                  </div>

                </div>

              </div>
            </Card>
          </div>


          {/* ================================================= */}
          {/* LATEST JOB MATCH */}
          {/* ================================================= */}

          <div
            className="dashboard-item"
            style={{ animationDelay: "260ms" }}
          >
            <Card
              className="
                group
                relative
                h-full
                overflow-hidden
                border-slate-200/80
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:border-emerald-200
                hover:shadow-xl
                hover:shadow-emerald-100/30
              "
            >

              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-emerald-100/70
                  opacity-0
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-50
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                      group-hover:bg-emerald-100
                    "
                  >
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

                {/* Progress */}

                <div className="mt-5">

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-emerald-400
                        to-emerald-500
                        transition-all
                        duration-1000
                        ease-out
                      "
                      style={{
                        width: `${displayedJobMatchScore}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            </Card>
          </div>

        </div>


        {/* ================================================= */}
        {/* RESUME OVERVIEW */}
        {/* ================================================= */}

        <div
          className="dashboard-item"
          style={{ animationDelay: "340ms" }}
        >
          <ResumeOverviewCard />
        </div>


        {/* ================================================= */}
        {/* JOB MATCH OVERVIEW */}
        {/* ================================================= */}

        <div
          className="dashboard-item"
          style={{ animationDelay: "420ms" }}
        >
          <JobMatchOverviewCard />
        </div>


        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ================================================= */}
          {/* AI INSIGHTS */}
          {/* ================================================= */}

          <div
            className="dashboard-item lg:col-span-2"
            style={{ animationDelay: "500ms" }}
          >
            <div className="h-full transition-transform duration-500 hover:-translate-y-1">
              <AIInsightsCard />
            </div>
          </div>


          {/* ================================================= */}
          {/* QUICK ACTIONS */}
          {/* ================================================= */}

          <div
            className="dashboard-item"
            style={{ animationDelay: "580ms" }}
          >

            <Card
              className="
                group
                relative
                h-full
                overflow-hidden
                border-slate-200/80
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-xl
                hover:shadow-indigo-100/30
              "
            >

              {/* Background glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-indigo-100/60
                  opacity-0
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:scale-125
                  group-hover:opacity-100
                "
              />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="font-semibold text-slate-900">
                      Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage your resume and analysis.
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-50
                      transition-all
                      duration-300
                      group-hover:bg-indigo-50
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-indigo-600
                      "
                    />
                  </div>

                </div>


                <div className="mt-6 space-y-3">

                  {/* Upload Resume */}

                  <div className="transition-all duration-300 hover:translate-x-1">

                    <Button
                      className="
                        w-full
                        shadow-sm
                        transition-all
                        duration-300
                        hover:shadow-lg
                        hover:shadow-indigo-200/40
                      "
                      onClick={() => navigate("/resume")}
                    >
                      <FileText className="h-4 w-4" />
                      Upload Resume
                    </Button>

                  </div>


                  {/* Analyze Resume */}

                  <div className="transition-all duration-300 hover:translate-x-1">

                    <Button
                      variant="secondary"
                      className="
                        w-full
                        transition-all
                        duration-300
                        hover:border-violet-200
                        hover:bg-violet-50
                        hover:text-violet-700
                      "
                      onClick={() => navigate("/analysis")}
                    >
                      <Sparkles className="h-4 w-4" />
                      Analyze Resume
                    </Button>

                  </div>


                  {/* Match Job */}

                  <div className="transition-all duration-300 hover:translate-x-1">

                    <Button
                      variant="secondary"
                      className="
                        w-full
                        transition-all
                        duration-300
                        hover:border-emerald-200
                        hover:bg-emerald-50
                        hover:text-emerald-700
                      "
                      onClick={() => navigate("/job-matching")}
                    >
                      <Target className="h-4 w-4" />
                      Match Job
                    </Button>

                  </div>

                </div>

              </div>
            </Card>

          </div>

        </div>


      </div>
    </>
  );
}

export default Dashboard;
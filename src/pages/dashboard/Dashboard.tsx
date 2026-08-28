// import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

// function Dashboard() {
//     return (
//         <DashboardSkeleton />
//     );
// }

// export default Dashboard;


// import {
//     FileText,
// } from "lucide-react";

// import Button from "../../components/ui/Button";
// import EmptyState from "../../components/ui/EmptyState";

// function Dashboard() {
//     return (
//         <div className="space-y-8">

//             <div>
//                 <h1 className="text-2xl font-bold tracking-tight text-slate-900">
//                     Dashboard
//                 </h1>

//                 <p className="mt-1 text-sm text-slate-500">
//                     Welcome back. Let's get your resume ready.
//                 </p>
//             </div>

//             <EmptyState
//                 icon={<FileText className="h-6 w-6" />}
//                 title="No resume uploaded yet"
//                 description="Upload your resume to unlock AI-powered resume analysis, ATS scoring and job matching."
//                 action={
//                     <Button>
//                         <FileText className="h-4 w-4" />
//                         Upload Your Resume
//                     </Button>
//                 }
//             />

//         </div>
//     );
// }

// export default Dashboard;

// import { RefreshCw } from "lucide-react";

// import Button from "../../components/ui/Button";
// import ErrorState from "../../components/ui/ErrorState";

// function Dashboard() {
//     return (
//         <div className="space-y-8">

//             <div>
//                 <h1 className="text-2xl font-bold tracking-tight text-slate-900">
//                     Dashboard
//                 </h1>

//                 <p className="mt-1 text-sm text-slate-500">
//                     Welcome back. Let's get your resume ready.
//                 </p>
//             </div>

//             <ErrorState
//                 title="Unable to load your dashboard"
//                 description="We couldn't retrieve your resume information. Please try again."
//                 action={
//                     <Button>
//                         <RefreshCw className="h-4 w-4" />
//                         Try Again
//                     </Button>
//                 }
//             />

//         </div>
//     );
// }

// export default Dashboard;
// ================================================================================================

import { FileText, Sparkles, Target } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ScoreRing from "../../components/analysis/ScoreRing";
import ResumeOverviewCard from "../../components/resume/ResumeOverviewCard";
import JobMatchOverviewCard from "../../components/job-matching/JobMatchOverviewCard";
import AIInsightsCard from "../../components/analysis/AIInsightsCard";

function Dashboard() {
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
          Welcome back, Rohan. Here's your resume intelligence.
        </p>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Resume */}

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            <Badge variant="success">Uploaded</Badge>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-500">Current Resume</p>

            <h2 className="mt-1 truncate text-base font-semibold text-slate-900">
              Rohan_Vadluri_Resume.pdf
            </h2>

            <p className="mt-1 text-xs text-slate-400">Last updated recently</p>
          </div>
        </Card>

        {/* ATS Score */}

        {/* <Card>
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
              <Sparkles className="h-5 w-5 text-violet-600" />
            </div>

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    ATS Score
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Latest resume analysis
                  </p>
                </div>

                <Sparkles className="h-5 w-5 text-violet-500" />
              </div>

              <div className="mt-4 flex justify-center">
                <ScoreRing score={85} />
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-500">ATS Score</p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                85
              </span>

              <span className="mb-1 text-sm text-slate-400">/ 100</span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Based on your latest analysis
            </p>
          </div>
        </Card> */}
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
                85
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
        <ScoreRing score={85} />
    </div>

</Card>

        {/* Job Match */}

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <Target className="h-5 w-5 text-emerald-600" />
            </div>

            <Badge variant="info">Strong Match</Badge>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-500">
              Latest Job Match
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                92%
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Based on your latest job comparison
            </p>
          </div>
        </Card>
      </div>

      {/* Resume Overview */}

      <div>
        <ResumeOverviewCard />
      </div>

      {/* Job Match */}

      <div>
        <JobMatchOverviewCard />
      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI INSIGHTS */}

        <AIInsightsCard />

        {/* QUICK ACTIONS */}

        <Card>
          <div>
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your resume and analysis.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Button className="w-full">
              <FileText className="h-4 w-4" />
              Upload Resume
            </Button>

            <Button variant="secondary" className="w-full">
              <Sparkles className="h-4 w-4" />
              Analyze Resume
            </Button>

            <Button variant="secondary" className="w-full">
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

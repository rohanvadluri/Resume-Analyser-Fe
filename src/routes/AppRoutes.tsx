import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import ResumePage from "../pages/resume/ResumePage";
import AnalysisPage from "../pages/analysis/AnalysisPage";
import JobMatchingPage from "../pages/job-matching/JobMatchingPage";
import AnalysisHistory from "../pages/history/AnalysisHistory";
import JobMatchHistory from "../pages/history/JobMatchHistory";
import JobMatchDetailsPage from "../pages/job-matching/JobMatchDetailsPage";
import ProfilePage from "../pages/profile/ProfilePage";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AnalysisDetailsPage from "../pages/analysis/AnalysisDetailsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ================================================= */}
        {/* PROTECTED APPLICATION */}
        {/* ================================================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/resume" element={<ResumePage />} />

            <Route path="/analysis" element={<AnalysisPage />} />
            <Route
              path="/analysis/:analysisId"
              element={<AnalysisDetailsPage />}
            />

            <Route path="/job-matching" element={<JobMatchingPage />} />

            <Route
              path="/job-matching/:jobMatchId"
              element={<JobMatchDetailsPage />}
            />

            <Route path="/history/analysis" element={<AnalysisHistory />} />

            <Route path="/history/job-matches" element={<JobMatchHistory />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

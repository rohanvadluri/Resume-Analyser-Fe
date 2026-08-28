import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import ResumePage from "../pages/resume/ResumePage";
import AnalysisPage from "../pages/analysis/AnalysisPage";
import JobMatchingPage from "../pages/job-matching/JobMatchingPage";
import AnalysisHistory from "../pages/history/AnalysisHistory";
import JobMatchHistory from "../pages/history/JobMatchHistory";
import ProfilePage from "../pages/profile/ProfilePage";

import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Authenticated Application */}
          <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/resume" element={<ResumePage />} />

          <Route path="/analysis" element={<AnalysisPage />} />

          <Route path="/job-matching" element={<JobMatchingPage />} />

          <Route path="/history/analysis" element={<AnalysisHistory />} />

          <Route path="/history/job-matches" element={<JobMatchHistory />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

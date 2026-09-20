import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Target,
  History,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Resume",
      path: "/resume",
      icon: FileText,
    },
    {
      name: "AI Analysis",
      path: "/analysis",
      icon: Sparkles,
    },
    {
      name: "Job Matching",
      path: "/job-matching",
      icon: Target,
    },
    {
      name: "Analysis History",
      path: "/history/analysis",
      icon: History,
    },
    {
      name: "Job Match History",
      path: "/history/job-matches",
      icon: Target,
    },
  ];

  return (
    <>
      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-screen w-64 shrink-0 flex-col
                    border-r border-slate-200 bg-white
                    transition-transform duration-300
                    lg:static lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
      >
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                ResumeAI
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Resume Intelligence
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <nav className="flex-1 px-3 py-6">
          {/* Main Section */}

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                                        group flex items-center gap-3 rounded-xl px-3 py-2.5
                                        text-sm font-medium transition-all duration-200
                                        ${
                                          isActive
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }
                                        `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`
                                                    h-[18px] w-[18px] transition-colors
                                                    ${
                                                      isActive
                                                        ? "text-indigo-600"
                                                        : "text-slate-400 group-hover:text-slate-600"
                                                    }
                                                `}
                      />

                      <span>{item.name}</span>

                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* ACCOUNT SECTION */}
          {/* ================================================= */}

          <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `
                            group flex items-center gap-3 rounded-xl px-3 py-2.5
                            text-sm font-medium transition-all duration-200
                            ${
                              isActive
                                ? "bg-indigo-50 text-indigo-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }
                            `
            }
          >
            {({ isActive }) => (
              <>
                <User
                  className={`
                                 h-[18px] w-[18px]
                                        ${
                                          isActive
                                            ? "text-indigo-600"
                                            : "text-slate-400 group-hover:text-slate-600"
                                        }
                                    `}
                />

                <span>Profile </span>

                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* ================================================= */}
        {/* USER / LOGOUT AREA */}
        {/* ================================================= */}

        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-3 rounded-xl p-2">
            {/* Avatar */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {user
                ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                : "U"}
            </div>

            {/* User Information */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.firstName ?? "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.role ?? "USER"}
              </p>
            </div>

            {/* Logout */}

            <button
              type="button"
              title="Logout"
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

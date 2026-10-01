import { useState } from "react";

import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    Moon,
    Search,
    Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";


interface NavbarProps {
    onMenuClick: () => void;
}


function Navbar({ onMenuClick }: NavbarProps) {

    const {
        isDarkMode,
        toggleDarkMode,
    } = useTheme();


    const {
        user,
        logout,
    } = useAuthContext();


    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


    /*
     * Generate user initials dynamically.
     *
     * Example:
     * Rohan Vadluri -> RV
     * John Smith    -> JS
     */
    const initials =
        `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`;


    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <div className="flex items-center gap-4">

                {/* Mobile Menu Button */}

                <button
                    type="button"
                    aria-label="Open navigation menu"
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>


                <div>

                    <p className="text-sm font-medium text-slate-500">
                        Workspace
                    </p>

                    <h2 className="text-sm font-semibold text-slate-900">
                        Resume Analyzer
                    </h2>

                </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT SIDE */}
            {/* ================================================= */}

            <div className="flex items-center gap-3">

                {/* ================================================= */}
                {/* SEARCH */}
                {/* ================================================= */}

                <button
                    type="button"
                    className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 md:flex"
                >

                    <Search className="h-4 w-4" />

                    <span>
                        Search
                    </span>

                    <span className="ml-4 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                        ⌘ K
                    </span>

                </button>


                {/* ================================================= */}
                {/* NOTIFICATION */}
                {/* ================================================= */}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >

                    <Bell className="h-5 w-5" />

                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />

                </button>


                {/* ================================================= */}
                {/* THEME TOGGLE */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={toggleDarkMode}
                    aria-label={
                        isDarkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    aria-pressed={isDarkMode}
                    className="
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        text-slate-500
                        transition-all
                        duration-200
                        hover:bg-slate-100
                        hover:text-slate-700
                        active:scale-95
                    "
                >

                    {isDarkMode ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}

                </button>


                {/* ================================================= */}
                {/* DIVIDER */}
                {/* ================================================= */}

                <div className="mx-1 h-8 w-px bg-slate-200" />


                {/* ================================================= */}
                {/* USER MENU */}
                {/* ================================================= */}

                <div className="relative">

                    {/* USER BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsUserMenuOpen((previous) => !previous)
                        }
                        aria-expanded={isUserMenuOpen}
                        aria-haspopup="menu"
                        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50"
                    >

                        {/* Avatar */}

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                            {initials || "U"}
                        </div>


                        {/* User Details */}

                        <div className="hidden text-left lg:block">

                            <p className="text-sm font-semibold text-slate-900">
                                {user?.firstName} {user?.lastName}
                            </p>

                            <p className="text-xs text-slate-500">
                                {user?.role || "Candidate"}
                            </p>

                        </div>


                        {/* Arrow */}

                        <ChevronDown
                            className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 lg:block ${
                                isUserMenuOpen
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />

                    </button>


                    {/* ================================================= */}
                    {/* DROPDOWN */}
                    {/* ================================================= */}

                    {isUserMenuOpen && (

                        <div
                            className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                            role="menu"
                        >

                            {/* USER INFORMATION */}

                            <div className="border-b border-slate-100 px-3 py-2.5">

                                <p className="text-sm font-semibold text-slate-900">
                                    {user?.firstName} {user?.lastName}
                                </p>

                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                    {user?.username}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {user?.role || "Candidate"}
                                </p>

                            </div>


                            {/* LOGOUT */}

                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {

                                    logout();

                                    setIsUserMenuOpen(false);

                                }}
                                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >

                                <LogOut className="h-4 w-4" />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}


export default Navbar;
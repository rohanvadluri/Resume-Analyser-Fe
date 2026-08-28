import {
    Bell,
    ChevronDown,
    Menu,
    Search,
} from "lucide-react";

interface NavbarProps {
    onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
    
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

                {/* Search */}

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

                {/* Notification */}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                    <Bell className="h-5 w-5" />

                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                </button>

                {/* Divider */}

                <div className="mx-1 h-8 w-px bg-slate-200" />

                {/* User Menu */}

                <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50"
                >

                    {/* Avatar */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                        RV
                    </div>

                    {/* User Details */}

                    <div className="hidden text-left lg:block">

                        <p className="text-sm font-semibold text-slate-900">
                            Rohan Vadluri
                        </p>

                        <p className="text-xs text-slate-500">
                            Candidate
                        </p>

                    </div>

                    <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />

                </button>

            </div>

        </header>
    );
}

export default Navbar;
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

interface ErrorStateProps {
    title?: string;
    description?: string;
    action?: ReactNode;
}

function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load this information. Please try again.",
    action,
}: ErrorStateProps) {

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white px-6 py-14 text-center">

            {/* ================================================= */}
            {/* ICON */}
            {/* ================================================= */}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">

                <AlertTriangle className="h-6 w-6" />

            </div>

            {/* ================================================= */}
            {/* TITLE */}
            {/* ================================================= */}

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {title}
            </h2>

            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {description}
            </p>

            {/* ================================================= */}
            {/* ACTION */}
            {/* ================================================= */}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>
    );
}

export default ErrorState;
import type { ReactNode } from "react";

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">

            {/* Icon */}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {icon}
            </div>

            {/* Title */}

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {title}
            </h2>

            {/* Description */}

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {description}
            </p>

            {/* Action */}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>
    );
}

export default EmptyState;
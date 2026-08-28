import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

function Badge({
    children,
    variant = "neutral",
}: BadgeProps) {

    const variants = {
        success:
            "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",

        warning:
            "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",

        danger:
            "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",

        info:
            "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",

        neutral:
            "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${variants[variant]}
            `}
        >
            {children}
        </span>
    );
}

export default Badge;
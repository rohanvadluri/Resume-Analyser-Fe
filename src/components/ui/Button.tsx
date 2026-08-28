import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {

    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
        primary:
            "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800",

        secondary:
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        danger:
            "bg-rose-600 text-white shadow-sm hover:bg-rose-700",

        ghost:
            "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    };

    const sizes = {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
    };

    return (
        <button
            disabled={disabled || loading}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
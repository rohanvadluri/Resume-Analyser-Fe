import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
}

function Card({
    children,
    padding = "md",
    hover = false,
    className = "",
    ...props
}: CardProps) {

    const paddingStyles = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                shadow-sm
                transition-all
                duration-300
                ease-out

                ${hover
                    ? `
                        cursor-pointer
                        hover:-translate-y-1
                        hover:border-indigo-100
                        hover:shadow-lg
                        hover:shadow-indigo-100/40
                    `
                    : ""
                }

                ${paddingStyles[padding]}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}

export default Card;
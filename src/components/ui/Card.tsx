import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
}

function Card({
    children,
    padding = "md",
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
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
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
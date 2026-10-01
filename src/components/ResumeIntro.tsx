import { useEffect } from "react";

interface ResumeIntroProps {
    onComplete: () => void;
}

function ResumeIntro({ onComplete }: ResumeIntroProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">

            <div className="text-center">

                {/* APP NAME */}

                <h1
                    className="
                        resume-intro-title
                        text-4xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-5xl
                    "
                >
                    Resume Analyzer
                </h1>


                {/* SUBTITLE */}

                <p
                    className="
                        resume-intro-subtitle
                        mt-4
                        text-sm
                        tracking-[0.25em]
                        text-slate-400
                        uppercase
                    "
                >
                    Developed by Rohan Vadluri
                </p>


                {/* LOADING LINE */}

                <div className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-slate-800">

                    <div
                        className="
                            h-full
                            w-full
                            origin-left
                            animate-[introProgress_2.3s_ease-out_forwards]
                            bg-indigo-500
                        "
                    />

                </div>

            </div>

        </div>
    );
}

export default ResumeIntro;
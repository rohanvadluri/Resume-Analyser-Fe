import { useEffect, useState } from "react";

interface SplashScreenProps {
    onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {

    const [isVisible, setIsVisible] = useState(true);
    const [showName, setShowName] = useState(false);
    const [showTagline, setShowTagline] = useState(false);
    const [showDeveloper, setShowDeveloper] = useState(false);

    useEffect(() => {

   // Show app name
const nameTimer = setTimeout(() => {
    setShowName(true);
}, 500);

// Show tagline
const taglineTimer = setTimeout(() => {
    setShowTagline(true);
}, 1000);

// Show developer
const developerTimer = setTimeout(() => {
    setShowDeveloper(true);
}, 1400);

// Start exit animation
const exitTimer = setTimeout(() => {
    setIsVisible(false);
}, 1900);

// Finish
const completeTimer = setTimeout(() => {
    onComplete();
}, 2200);
        return () => {
            clearTimeout(nameTimer);
            clearTimeout(taglineTimer);
            clearTimeout(developerTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };

    }, [onComplete]);


    return (
        <div
            className={`
                fixed inset-0 z-[9999]
                flex items-center justify-center
                overflow-hidden
                bg-slate-950
                transition-all duration-300
                ${
                    isVisible
                        ? "opacity-100"
                        : "scale-110 opacity-0"
                }
            `}
        >

            {/* Background glow */}

            <div
                className="
                    absolute
                    h-72
                    w-72
                    rounded-full
                    bg-indigo-600/10
                    blur-3xl
                    animate-pulse
                "
            />


            <div className="relative flex flex-col items-center text-center">


                {/* ============================================ */}
                {/* DOCUMENT */}
                {/* ============================================ */}

                <div
                    className="
                        relative
                        flex
                        h-28
                        w-24
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        shadow-2xl
                        animate-[introDocument_1.2s_ease-out]
                    "
                >

                    <div
                        className="
                            absolute
                            inset-3
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-800
                        "
                    >

                        <span
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                text-4xl
                                font-black
                                text-indigo-400
                            "
                        >
                            R
                        </span>

                        <div className="absolute bottom-4 left-3 right-3 space-y-1">

                            <div className="h-1 rounded-full bg-slate-600" />

                            <div className="h-1 w-3/4 rounded-full bg-slate-600" />

                        </div>

                    </div>


                    {/* Scan */}

                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            h-0.5
                            bg-indigo-400
                            shadow-[0_0_12px_3px_rgba(129,140,248,0.6)]
                            animate-[scan_1.4s_ease-in-out_infinite]
                        "
                    />

                </div>


                {/* ============================================ */}
                {/* APP NAME */}
                {/* ============================================ */}

                <div
                    className={`
                        mt-7
                        transition-all
                        duration-700
                        ${
                            showName
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }
                    `}
                >

                    <h1
                        className="
                            resume-intro-title
                            text-3xl
                            font-bold
                            tracking-tight
                            text-white
                            sm:text-5xl
                        "
                    >
                        Resume Analyzer
                    </h1>

                </div>


                {/* ============================================ */}
                {/* TAGLINE */}
                {/* ============================================ */}

                <div
                    className={`
                        transition-all
                        duration-700
                        ${
                            showTagline
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }
                    `}
                >

                    <p
                        className="
                            mt-3
                            text-sm
                            tracking-wide
                            text-slate-400
                            sm:text-base
                        "
                    >
                        Analyze. Improve. Get Hired.
                    </p>

                </div>


                {/* ============================================ */}
                {/* DEVELOPER */}
                {/* ============================================ */}

                <div
                    className={`
                        mt-10
                        transition-all
                        duration-700
                        ${
                            showDeveloper
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                        }
                    `}
                >

                    <p className="text-xs text-slate-500">
                        Developed by
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-300">
                        Rohan Vadluri
                    </p>

                </div>


                {/* ============================================ */}
                {/* LOADING */}
                {/* ============================================ */}

                <div className="mt-7 h-1 w-32 overflow-hidden rounded-full bg-slate-800">

                    <div
                        className="
                            h-full
                            w-full
                            origin-left
                            rounded-full
                            bg-indigo-500
                            animate-[introProgress_2.5s_ease-out_forwards]
                        "
                    />

                </div>

            </div>

        </div>
    );
}

export default SplashScreen;
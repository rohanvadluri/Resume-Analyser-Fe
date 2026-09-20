import { useEffect, useState } from "react";

interface ScoreRingProps {
    score: number;
    size?: number;
}

function ScoreRing({
    score,
    size = 150,
}: ScoreRingProps) {

    const [animatedScore, setAnimatedScore] = useState(0);

    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    /*
     * Animate score from 0 to actual score
     */
    useEffect(() => {

        let currentScore = 0;

        const duration = 1000;
        const intervalTime = 15;

        const increment =
            score / (duration / intervalTime);

        const interval = setInterval(() => {

            currentScore += increment;

            if (currentScore >= score) {

                currentScore = score;

                clearInterval(interval);
            }

            setAnimatedScore(Math.round(currentScore));

        }, intervalTime);

        return () => clearInterval(interval);

    }, [score]);


    /*
     * Score color
     */
    const getScoreColor = () => {

        if (animatedScore >= 80) {
            return "text-emerald-500";
        }

        if (animatedScore >= 60) {
            return "text-amber-500";
        }

        return "text-rose-500";
    };


    /*
     * Ring glow
     */
    const getGlowColor = () => {

        if (animatedScore >= 80) {
            return "drop-shadow-[0_0_8px_rgba(16,185,129,0.35)]";
        }

        if (animatedScore >= 60) {
            return "drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]";
        }

        return "drop-shadow-[0_0_8px_rgba(244,63,94,0.35)]";
    };


    /*
     * Score label
     */
    const getScoreLabel = () => {

        if (animatedScore >= 80) {
            return "Excellent";
        }

        if (animatedScore >= 60) {
            return "Good";
        }

        return "Needs Improvement";
    };


    /*
     * Ring progress
     */
    const progress =
        circumference -
        (animatedScore / 100) * circumference;


    return (
        <div className="flex flex-col items-center">

            {/* SCORE RING */}

            <div
                className="relative"
                style={{
                    width: size,
                    height: size,
                }}
            >

                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 120 120"
                    className={`-rotate-90 ${getGlowColor()}`}
                >

                    {/* Background */}

                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-100"
                    />


                    {/* Progress */}

                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        className={`
                            ${getScoreColor()}
                            transition-all
                            duration-300
                            ease-out
                        `}
                    />

                </svg>


                {/* CENTER */}

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span
                        className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            transition-all
                            duration-300
                        "
                    >
                        {animatedScore}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                        / 100
                    </span>

                </div>

            </div>


            {/* LABEL */}

            <div className="mt-3">

                <p
                    className={`
                        text-sm
                        font-semibold
                        transition-colors
                        duration-300
                        ${getScoreColor()}
                    `}
                >
                    {getScoreLabel()}
                </p>

            </div>

        </div>
    );
}

export default ScoreRing;
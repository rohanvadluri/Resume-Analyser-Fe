interface ScoreRingProps {
    score: number;
    size?: number;
}

function ScoreRing({
    score,
    size = 150,
}: ScoreRingProps) {

    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    const progress =
        circumference - (score / 100) * circumference;

    const getScoreColor = () => {

        if (score >= 80) {
            return "text-emerald-500";
        }

        if (score >= 60) {
            return "text-amber-500";
        }

        return "text-rose-500";
    };

    const getScoreLabel = () => {

        if (score >= 80) {
            return "Excellent";
        }

        if (score >= 60) {
            return "Good";
        }

        return "Needs Improvement";
    };

    return (
        <div className="flex flex-col items-center">

            {/* Score Ring */}

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
                    className="-rotate-90"
                >

                    {/* Background Ring */}

                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-100"
                    />

                    {/* Progress Ring */}

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
                        className={`${getScoreColor()} transition-all duration-1000`}
                    />

                </svg>

                {/* Center Content */}

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold tracking-tight text-slate-900">
                        {score}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                        / 100
                    </span>

                </div>

            </div>

            {/* Label */}

            <div className="mt-3">

                <p
                    className={`
                        text-sm
                        font-semibold
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
import {
    Download,
    ExternalLink,
    FileText,
    Sparkles,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ResumeOverviewCard() {
    return (
        <Card>

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                        <FileText className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div>

                        <h2 className="font-semibold text-slate-900">
                            Current Resume
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Your latest uploaded resume
                        </p>

                    </div>

                </div>

                <Badge variant="success">
                    Uploaded
                </Badge>

            </div>


            {/* Resume Information */}

            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        <FileText className="h-5 w-5 text-slate-500" />
                    </div>

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold text-slate-900">
                            Rohan_Vadluri_Resume.pdf
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            PDF • 520 words • Uploaded recently
                        </p>

                    </div>

                </div>

            </div>


            {/* Actions */}

            <div className="mt-5 flex flex-wrap items-center gap-3">

                <Button
                    variant="secondary"
                    size="sm"
                >
                    <ExternalLink className="h-4 w-4" />
                    View
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                >
                    <Download className="h-4 w-4" />
                    Download
                </Button>

                <Button
                    size="sm"
                    className="ml-auto"
                >
                    <Sparkles className="h-4 w-4" />
                    Analyze Resume
                </Button>

            </div>

        </Card>
    );
}

export default ResumeOverviewCard;
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

function DashboardSkeleton() {
    return (
        <div className="space-y-8">

            {/* Page Header */}

            <div className="space-y-2">

                <Skeleton className="h-7 w-40" />

                <Skeleton className="h-4 w-72" />

            </div>


            {/* Summary Cards */}

            <div className="grid gap-6 md:grid-cols-3">

                <Card>
                    <Skeleton className="h-11 w-11 rounded-xl" />

                    <div className="mt-5 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </Card>


                <Card>
                    <Skeleton className="h-11 w-11 rounded-xl" />

                    <div className="mt-5 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </Card>


                <Card>
                    <Skeleton className="h-11 w-11 rounded-xl" />

                    <div className="mt-5 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </Card>

            </div>


            {/* Resume */}

            <Card>

                <Skeleton className="h-6 w-40" />

                <Skeleton className="mt-4 h-4 w-64" />

                <Skeleton className="mt-6 h-20 w-full rounded-xl" />

            </Card>


            {/* Job Match */}

            <Card>

                <Skeleton className="h-6 w-40" />

                <Skeleton className="mt-6 h-24 w-full rounded-xl" />

                <div className="mt-5 flex gap-2">

                    <Skeleton className="h-7 w-16" />

                    <Skeleton className="h-7 w-24" />

                    <Skeleton className="h-7 w-20" />

                </div>

            </Card>


            {/* Bottom Section */}

            <div className="grid gap-6 lg:grid-cols-3">

                <Card className="lg:col-span-2">

                    <Skeleton className="h-6 w-44" />

                    <Skeleton className="mt-6 h-20 w-full rounded-xl" />

                    <div className="mt-5 grid gap-3 md:grid-cols-2">

                        <Skeleton className="h-20 w-full rounded-xl" />

                        <Skeleton className="h-20 w-full rounded-xl" />

                    </div>

                </Card>


                <Card>

                    <Skeleton className="h-6 w-32" />

                    <div className="mt-6 space-y-3">

                        <Skeleton className="h-10 w-full" />

                        <Skeleton className="h-10 w-full" />

                        <Skeleton className="h-10 w-full" />

                    </div>

                </Card>

            </div>

        </div>
    );
}

export default DashboardSkeleton;
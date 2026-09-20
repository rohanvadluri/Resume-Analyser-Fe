import { getAnalysisHistory } from "./analysisService";
import { getJobMatchHistory } from "./jobMatchingService";

export const getDashboardData = async () => {

    const [analysisResponse, jobMatchResponse] = await Promise.all([
        getAnalysisHistory(0, 1),
        getJobMatchHistory(0, 1),
    ]);

    return {
        latestAnalysis: analysisResponse.content[0] ?? null,
        latestJobMatch: jobMatchResponse.content[0] ?? null,
    };
};
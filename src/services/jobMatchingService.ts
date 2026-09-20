import api from "../api/axios";

import type {
    JobMatchRequest,
    JobMatchResponse,
    JobMatchHistoryPage,
    JobMatchDetailResponse,
} from "../types/jobMatching";

/**
 * Match resume with job description.
 */
export const matchResumeWithJobDescription = async (
    request: JobMatchRequest
): Promise<JobMatchResponse> => {

    const response = await api.post<JobMatchResponse>(
        "/api/job-matching/matchResumeWithJobDescription",
        request
    );

    return response.data;
};


/**
 * Get job match history.
 */
export const getJobMatchHistory = async (
    page: number = 0,
    size: number = 10
): Promise<JobMatchHistoryPage> => {

    const response = await api.get<JobMatchHistoryPage>(
        "/api/job-matching/getJobMatchHistoryByUserId",
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
};


/**
 * Get job match details by ID.
 */
export const getJobMatchDetails = async (
    jobMatchId: number
): Promise<JobMatchDetailResponse> => {

    const response = await api.get<JobMatchDetailResponse>(
        `/api/job-matching/getJobMatchById/${jobMatchId}`
    );

    return response.data;
};